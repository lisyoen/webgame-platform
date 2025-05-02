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

- **백엔드**: Node.js + TypeScript + Express
- **DB**: SQLite (게임 메타 정보 저장)
- **기타**: Multer, UUID

---

## 실행 방법

```bash
npm install
npx ts-node src/app.ts
```

---

## 접속 주소

플랫폼은 아래 주소에서 접속할 수 있습니다:

- **React 프론트엔드**: [http://lisyoen2.iptime.org:8001](http://lisyoen2.iptime.org:8001)
- **API 서버**: [http://lisyoen2.iptime.org:8000](http://lisyoen2.iptime.org:8000)

React 기반의 사용자 친화적인 인터페이스를 통해  
게임을 업로드하고 실행할 수 있습니다.  
지금 바로 접속하여 웹 게임을 즐겨보세요!
