"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// File: src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const path_1 = __importDefault(require("path"));
// 정적 파일 경로 추가 (uploads 디렉토리를 URL로 서빙)
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
// CORS 미들웨어 설정
app.use((0, cors_1.default)({
    origin: 'http://lisyoen2.iptime.org:8001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204, // Preflight 요청 성공 상태 코드
}));
// Preflight 요청에 대한 명시적 처리
// app.options('*', (req, res) => {
//   console.log('OPTIONS 요청 처리 중...');
//   res.header('Access-Control-Allow-Origin', 'http://lisyoen2.iptime.org:8001');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.sendStatus(204); // 성공 상태 코드
// });
// JSON 파싱 미들웨어
app.use(express_1.default.json());
// 요청 로깅 미들웨어
app.use((req, res, next) => {
    console.log(`요청: ${req.method} ${req.url}`);
    next();
});
const utils_1 = require("./utils");
app.get('/', (req, res) => {
    console.log('GET / 요청 처리 중...');
    const games = (0, utils_1.getGames)();
    res.json(games);
});
// 등록 라우트 연결
const register_1 = __importDefault(require("./routes/register"));
app.use('/register', register_1.default);
// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://lisyoen2.iptime.org:${port}`);
});
// 가장 아래에 추가
const delete_1 = __importDefault(require("./routes/delete"));
app.use('/delete', delete_1.default);
