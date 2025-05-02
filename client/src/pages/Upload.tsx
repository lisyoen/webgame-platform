import { useState } from 'react';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [gameId, setGameId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

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
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>등록 완료!</h2>
        <iframe
          src={`http://lisyoen2.iptime.org:8000/uploads/${gameId}/index.html`}
          style={{
            width: '100%',
            height: '80vh',
            border: 'none',
            borderRadius: '8px',
          }}
          title="game"
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '1rem' }}>게임 등록</h1>
      <input
        type="text"
        placeholder="게임 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          display: 'block',
          marginBottom: '1rem',
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxSizing: 'border-box',
        }}
      />
      <textarea
        placeholder="여기에 HTML 코드를 붙여넣으세요"
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
        rows={15}
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxSizing: 'border-box',
          marginBottom: '1rem',
        }}
      />
      <textarea
        placeholder="게임 프롬프트"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxSizing: 'border-box',
          marginBottom: '1rem',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          display: 'block',
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        등록
      </button>
    </div>
  );
};

export default Upload;
