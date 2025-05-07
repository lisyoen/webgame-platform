"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'temp/' });
router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file)
        return res.status(400).send('No file uploaded.');
    const id = (0, uuid_1.v4)();
    const uploadDir = path_1.default.join(__dirname, '..', '..', 'uploads', id);
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
});
exports.default = router;
