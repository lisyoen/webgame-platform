// File: src/routes/register.ts
import { Router, Request, Response } from 'express';
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

router.post('/', async (req: Request, res: Response): Promise<void> => {
  if (!req.body.title || !req.body.html) {
    res.status(400).json({ error: 'title and html are required' });
    return;
  }

  try {
    const id = uuidv4();
    const html = wrapHtml(req.body.title, req.body.html);

    const uploadDir = path.join(__dirname, '..', '..', 'uploads', id);
    fs.mkdirSync(uploadDir, { recursive: true });

    fs.writeFileSync(path.join(uploadDir, 'index.html'), html);

    insertGame(id, req.body.title, req.body.prompt || '');

    res.status(201).json({ message: 'Game registered successfully', id });
  } catch (error) {
    console.error(`[ERROR] 게임 등록 중 오류 발생: ${error}`);
    res.status(500).json({ error: 'Failed to register game' });
  }
});

export default router;
