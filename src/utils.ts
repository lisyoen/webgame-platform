import Database from 'better-sqlite3';

const db = new Database('./data/games.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    prompt TEXT,
    createdAt TEXT NOT NULL
  )
`);

export function insertGame(id: string, title: string, prompt: string) {
  const stmt = db.prepare('INSERT INTO games (id, title, prompt, createdAt) VALUES (?, ?, ?, ?)');
  stmt.run(id, title, prompt, new Date().toISOString());
}

export function getGames() {
    const stmt = db.prepare('SELECT * FROM games ORDER BY createdAt DESC');
    return stmt.all();
  }
