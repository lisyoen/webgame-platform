import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dbPath = './data/games.db';
const dbDir = path.dirname(dbPath);

// 디렉토리가 없으면 생성
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    prompt TEXT,
    createdAt TEXT NOT NULL
  )
`);

export function insertGame(id: string, title: string, prompt: string): void {
  const stmt = db.prepare('INSERT INTO games (id, title, prompt, createdAt) VALUES (?, ?, ?, ?)');
  stmt.run(id, title, prompt, new Date().toISOString());
}

export function getGames(): any[] {
  const stmt = db.prepare('SELECT * FROM games ORDER BY createdAt DESC');
  return stmt.all();
}

export default db;
