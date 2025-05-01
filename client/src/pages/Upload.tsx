import { useState } from 'react';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [gameId, setGameId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim() || !htmlCode.trim()) {
      alert('제목과 HTML 코드를 모두 입력해주세요.');
      return;
    }

    const res = await fetch('http://lisyoen2.iptime.org:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, html: htmlCode }),
    });

    const data = await res.json();
    setGameId(data.id);
  };

  if (gameId) {
    return (
      <div>
        <h2>등록 완료!</h2>
        <iframe
          src={`http://lisyoen2.iptime.org:8000/uploads/${gameId}/index.html`}
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />
      <textarea
        placeholder="여기에 HTML 코드를 붙여넣으세요"
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
        rows={15}
        style={{ width: '100%' }}
      />
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
};

export default Upload;
