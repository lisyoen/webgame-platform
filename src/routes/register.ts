// File: src/routes/register.ts
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { insertGame } from '../utils';

const router = Router();

// HTML 보정 함수
function wrapHtml(title: string, rawHtml: string): string {
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
        finalHtml = finalHtml.replace(
            /<head[^>]*>/i,
            match => `${match}\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">`
        );
    }

    // 👇 </body> 전에 자동 JS 삽입
    finalHtml = finalHtml.replace(/<\/body>/i, `${autoResizeScript}\n</body>`);

    return finalHtml;
}

router.post('/', async (req, res) => {
    console.log('POST /register 요청 처리 중...');
    const { title, html } = req.body;

    if (!title || !html) {
        console.log('요청 데이터가 유효하지 않음');
        return res.status(400).json({ error: 'title and html are required' });
    }

    const id = uuidv4();
    const createdAt = new Date().toISOString();

    // DB 저장
    insertGame(id, title);

    // HTML 보정 및 저장
    const gamePath = path.join(__dirname, '..', '..', 'uploads', id);
    fs.mkdirSync(gamePath, { recursive: true });
    const finalHtml = wrapHtml(title, html); // ← 적용 위치
    fs.writeFileSync(path.join(gamePath, 'index.html'), finalHtml, 'utf-8');

    res.status(201).json({ id });
});

export default router;
