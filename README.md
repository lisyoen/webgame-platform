# WebGame Platform

Gemini Canvas 같은 툴로 만든 HTML 게임을 업로드하면  
게시판처럼 등록되고, 클릭하면 바로 실행되는 웹게임 플랫폼입니다.

이 플랫폼은 사용자가 간단한 HTML 기반 게임을 업로드하고,  
다른 사용자들이 이를 쉽게 탐색하고 실행할 수 있도록 설계되었습니다.  
iframe을 통해 즉시 실행할 수 있습니다.

---

## 기능

- 게임 목록 보기
- iframe으로 즉시 실행
- 게임 삭제 기능

---

## 기술 스택

- **개발도구**: VSCode + Copilot + ChatGPT 4o

- **백엔드**: Node.js + TypeScript + Express
- **DB**: SQLite (게임 메타 정보 저장)
- **기타**: Multer, UUID

---

## 실행 방법

```bash
npm install
npx ts-node

