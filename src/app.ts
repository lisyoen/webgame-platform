// File: src/app.ts
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

import path from 'path';

// 정적 파일 경로 추가 (uploads 디렉토리를 URL로 서빙)
app.use('/upload', express.static(path.join(__dirname, '..', 'uploads')));


// CORS 미들웨어 설정
app.use(cors({
  origin: 'http://lisyoen2.iptime.org:8001', // React 앱의 정확한 출처를 명시
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 허용할 HTTP 메서드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 요청 헤더
  credentials: true, // 쿠키 및 인증 정보 허용 (필요 시)
  preflightContinue: false, // Preflight 요청을 자동으로 처리
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
app.use(express.json());

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`요청: ${req.method} ${req.url}`);
  next();
});

import { getGames } from './utils';

app.get('/', (req, res) => {
  console.log('GET / 요청 처리 중...');
  const games = getGames();
  res.json(games);
});

// 등록 라우트 연결
import registerRouter from './routes/register';
app.use('/register', registerRouter);

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://lisyoen2.iptime.org:${port}`);
});

// 가장 아래에 추가
import deleteRouter from './routes/delete';
app.use('/delete', deleteRouter);
