"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
router.post('/', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    const id = (0, uuid_1.v4)();
    const uploadDir = path_1.default.join(__dirname, '..', '..', 'uploads', id);
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
    try {
        res.status(200).send({ message: 'File uploaded successfully', id });
    }
    catch (error) {
        console.error(`[ERROR] 파일 업로드 중 오류 발생: ${error}`);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
