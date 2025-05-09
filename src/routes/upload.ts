import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import unzipper from 'unzipper';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const upload = multer({ dest: 'temp/' });

router.post('/', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const id = uuidv4();
  const uploadDir = path.join(__dirname, '..', '..', 'uploads', id);

  fs.mkdirSync(uploadDir, { recursive: true });

  try {
    res.status(200).send({ message: 'File uploaded successfully', id });
  } catch (error) {
    console.error(`[ERROR] 파일 업로드 중 오류 발생: ${error}`);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default router;
