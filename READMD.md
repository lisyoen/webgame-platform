# WebGame Platform

Gemini Canvas 같은 툴로 만든 HTML 게임을 업로드하면  
게시판처럼 등록되고, 클릭하면 바로 실행되는 웹게임 플랫폼입니다.

---

## 기능

- ZIP 파일 업로드 → 자동 압축 해제
- 게임 목록 보기 (제목, 썸네일 예정)
- iframe으로 즉시 실행

---

## 기술 스택

- **백엔드**: Node.js + TypeScript + Express
- **DB**: SQLite (게임 메타 정보 저장)
- **기타**: Multer, Unzipper, UUID

---

## 실행 방법

```bash
npm install
npx ts-node src/app.ts
