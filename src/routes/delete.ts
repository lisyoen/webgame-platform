// File: src/routes/delete.ts
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const router = Router();

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(`[DELETE] 게임 삭제 요청: id=${id}`);

  const dbPath = path.join(__dirname, '..', '..', 'data', 'games.db');
  const db = new Database(dbPath);

  const game = db.prepare('SELECT * FROM games WHERE id = ?').get(id);
  if (!game) {
    console.warn(`[WARN] 삭제 실패: id=${id} 게임 없음`);
    return res.status(404).json({ error: 'Game not found' });
  }

  // DB에서 삭제
  db.prepare('DELETE FROM games WHERE id = ?').run(id);
  db.close();

  // 파일 삭제
  const dir = path.join(__dirname, '..', '..', 'uploads', id);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`[DELETE] 디렉토리 삭제 완료: ${dir}`);
  }

  return res.json({ message: '삭제 완료', id });
});

export default router;
