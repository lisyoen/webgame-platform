"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const rows = utils_1.default.prepare('SELECT id, title, prompt, createdAt FROM games ORDER BY createdAt DESC').all();
    res.json(rows);
});
router.post('/register', async (req, res) => {
    const { title, html } = req.body;
    const id = (0, uuid_1.v4)();
    const uploadPath = path_1.default.join(__dirname, '../../uploads', id);
    await fs_1.default.promises.mkdir(uploadPath, { recursive: true });
    await fs_1.default.promises.writeFile(path_1.default.join(uploadPath, 'index.html'), html);
    const createdAt = new Date().toISOString();
    utils_1.default.prepare('INSERT INTO games (id, title, createdAt) VALUES (?, ?, ?)').run(id, title, createdAt);
    res.json({ id });
});
exports.default = router;
