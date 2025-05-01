#!/bin/bash

# 백엔드 실행 (Express - 8000번 포트)
echo "👉 백엔드 서버 실행 중... (포트 8000)"
cd ~/git/webgame-platform
nohup npx ts-node src/app.ts > server.log 2>&1 &

# 프론트엔드 실행 (Vite - 8001번 포트)
echo "👉 프론트엔드 실행 중... (포트 8001)"
cd ~/git/webgame-platform/client
nohup npm run dev -- --host --port 8001 > ../vite.log 2>&1 &

echo "✅ 서버와 클라이언트가 백그라운드에서 실행되었습니다."
echo "📂 로그: server.log / vite.log"
echo "🌐 접속:"
echo " - React 앱: http://lisyoen2.iptime.org:8001"
echo " - API 서버: http://lisyoen2.iptime.org:8000"
