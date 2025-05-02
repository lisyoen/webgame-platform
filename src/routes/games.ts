import express from 'express';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import db from '../utils';

const router = express.Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT id, title, prompt, createdAt FROM games ORDER BY createdAt DESC').all();
  res.json(rows);
});

router.post('/register', async (req, res) => {
  const { title, html } = req.body;
  const id = uuidv4();
  const uploadPath = path.join(__dirname, '../../uploads', id);

  await fs.promises.mkdir(uploadPath, { recursive: true });
  await fs.promises.writeFile(path.join(uploadPath, 'index.html'), html);

  const createdAt = new Date().toISOString();
  db.prepare('INSERT INTO games (id, title, createdAt) VALUES (?, ?, ?)').run(id, title, createdAt);

  res.json({ id });
});

export default router;
