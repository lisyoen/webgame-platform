"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGames = exports.insertGame = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const dbPath = './data/games.db';
const dbDir = path_1.default.dirname(dbPath);
// 디렉토리가 없으면 생성
if (!fs_1.default.existsSync(dbDir)) {
    fs_1.default.mkdirSync(dbDir, { recursive: true });
}
const db = new better_sqlite3_1.default(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    prompt TEXT,
    createdAt TEXT NOT NULL
  )
`);
function insertGame(id, title, prompt) {
    const stmt = db.prepare('INSERT INTO games (id, title, prompt, createdAt) VALUES (?, ?, ?, ?)');
    stmt.run(id, title, prompt, new Date().toISOString());
}
exports.insertGame = insertGame;
function getGames() {
    const stmt = db.prepare('SELECT * FROM games ORDER BY createdAt DESC');
    return stmt.all();
}
exports.getGames = getGames;
exports.default = db;
