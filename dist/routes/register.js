"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// File: src/routes/register.ts
const express_1 = require("express");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const router = (0, express_1.Router)();
// HTML 보정 함수
function wrapHtml(title, rawHtml) {
    const hasHtmlTag = /<html[\s\S]*?>/i.test(rawHtml);
    const hasViewport = /<meta\s+name=["']viewport["']/i.test(rawHtml);
    const autoResizeScript = `
  <script>
    const canvas = document.querySelector('canvas');
    if (canvas) {
      function resizeCanvas() {
        const ratio = canvas.width / canvas.height;
        let width = window.innerWidth;
        let height = width / ratio;
        if (height > window.innerHeight) {
          height = window.innerHeight;
          width = height * ratio;
        }
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
      }
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
    }
  </script>
  `.trim();
    let finalHtml = hasHtmlTag ? rawHtml : `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body>
    ${rawHtml}
  </body>
  </html>
  `.trim();
    if (!hasViewport) {
        finalHtml = finalHtml.replace(/<head[^>]*>/i, match => `${match}\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    }
    // 👇 </body> 전에 자동 JS 삽입
    finalHtml = finalHtml.replace(/<\/body>/i, `${autoResizeScript}\n</body>`);
    return finalHtml;
}
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || !req.body.html) {
        res.status(400).json({ error: 'title and html are required' });
        return;
    }
    try {
        const id = (0, uuid_1.v4)();
        const html = wrapHtml(req.body.title, req.body.html);
        const uploadDir = path_1.default.join(__dirname, '..', '..', 'uploads', id);
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
        fs_1.default.writeFileSync(path_1.default.join(uploadDir, 'index.html'), html);
        (0, utils_1.insertGame)(id, req.body.title, req.body.prompt || '');
        res.status(201).json({ message: 'Game registered successfully', id });
    }
    catch (error) {
        console.error(`[ERROR] 게임 등록 중 오류 발생: ${error}`);
        res.status(500).json({ error: 'Failed to register game' });
    }
}));
exports.default = router;
