import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import unzipper from 'unzipper';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const upload = multer({ dest: 'temp/' });

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const id = uuidv4();
  const uploadDir = path.join(__dirname, '..', '..', 'uploads', id);

  fs.mkdirSync(uploadDir, { recursive: true });

  fs.createReadStream(req.file.path)
    .pipe(unzipper.Extract({ path: uploadDir }))
    .on('close', () => {
      res.status(200).json({ id });
    });
});

export default router;
