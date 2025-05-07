"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// File: src/routes/delete.ts
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const router = (0, express_1.Router)();
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(`[DELETE] 게임 삭제 요청: id=${id}`);
    const dbPath = path_1.default.join(__dirname, '..', '..', 'data', 'games.db');
    const db = new better_sqlite3_1.default(dbPath);
    const game = db.prepare('SELECT * FROM games WHERE id = ?').get(id);
    if (!game) {
        console.warn(`[WARN] 삭제 실패: id=${id} 게임 없음`);
        return res.status(404).json({ error: 'Game not found' });
    }
    // DB에서 삭제
    db.prepare('DELETE FROM games WHERE id = ?').run(id);
    db.close();
    // 파일 삭제
    const dir = path_1.default.join(__dirname, '..', '..', 'uploads', id);
    if (fs_1.default.existsSync(dir)) {
        fs_1.default.rmSync(dir, { recursive: true, force: true });
        console.log(`[DELETE] 디렉토리 삭제 완료: ${dir}`);
    }
    return res.json({ message: '삭제 완료', id });
});
exports.default = router;
