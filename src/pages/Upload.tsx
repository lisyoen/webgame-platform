// src/pages/Upload.tsx

import { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [gameTitle, setGameTitle] = useState<string>('');
  const [htmlCode, setHtmlCode] = useState<string>('');

  const handleUpload = async () => {
    if (!file || !gameTitle || !htmlCode) return alert('모든 필드를 채워주세요.');
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('gameTitle', gameTitle);
    formData.append('htmlCode', htmlCode);
  
    const res = await fetch('http://lisyoen2.iptime.org:3000/upload', {
      method: 'POST',
      body: formData,
    });
  
    const uploadResult = await res.json();
  
    // 등록 API 호출
    const registerRes = await fetch('http://lisyoen2.iptime.org:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: gameTitle,
        html: htmlCode,
      }),
    });
  
    if (!registerRes.ok) {
      return alert('등록 실패');
    }
  
    const registerResult = await registerRes.json();
    console.log('등록 성공:', registerResult);
  
    // iframe 렌더링용 gameId 설정 (upload 쪽 결과가 기준이라면 그대로 유지)
    setGameId(uploadResult.id);
  };
  

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://lisyoen2.iptime.org:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 'example' }),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('요청 실패:', error);
    }
  };

  if (gameId) {
    return (
      <div>
        <h2>게임 등록 완료! 게임 실행</h2>
        <iframe
          src={`http://lisyoen2.iptime.org:3000/uploads/${gameId}/index.html`}
          style={{ width: '100%', height: '90vh', border: 'none' }}
          title="game"
        />
      </div>
    );
  }

  return (
    <div>
      <h1>게임 등록</h1>
      <input
        type="text"
        placeholder="게임 제목"
        value={gameTitle}
        onChange={(e) => setGameTitle(e.target.value)}
      />
      <textarea
        placeholder="게임 HTML 코드"
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
      />
      <input
        type="file"
        accept=".zip"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>게임 등록</button>
    </div>
  );
};

export default Upload;
