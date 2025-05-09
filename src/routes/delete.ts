// File: src/routes/delete.ts
import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const router = Router();

router.delete('/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  console.log(`[DELETE] 게임 삭제 요청: id=${id}`);

  const dbPath = path.join(__dirname, '..', '..', 'data', 'games.db');
  const db = new Database(dbPath);

  try {
    const game = db.prepare('SELECT * FROM games WHERE id = ?').get(id);
    if (!game) {
      console.warn(`[WARN] 삭제 실패: id=${id} 게임 없음`);
      res.status(404).json({ error: 'Game not found' });
      return;
    }

    db.prepare('DELETE FROM games WHERE id = ?').run(id);
    db.close();

    const dir = path.join(__dirname, '..', '..', 'uploads', id);
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`[DELETE] 디렉토리 삭제 완료: ${dir}`);
    }

    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error(`[ERROR] 게임 삭제 중 오류 발생: ${error}`);
    res.status(500).json({ error: 'Failed to delete game' });
  } finally {
    db.close();
  }
});

export default router;
