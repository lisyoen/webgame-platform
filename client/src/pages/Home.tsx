// Home.tsx
import { useEffect, useState } from 'react';

type Game = {
  id: string;
  title: string;
  createdAt: string;
  prompt: string;
};

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://lisyoen2.iptime.org:8000/')
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !htmlCode.trim()) {
      alert('제목과 HTML 코드를 모두 입력해주세요.');
      return;
    }

    console.log({ title, html: htmlCode, prompt });

    const res = await fetch('http://lisyoen2.iptime.org:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, html: htmlCode, prompt }), // prompt 추가
    });

    const data = await res.json();
    setGameId(data.id);
  };

  return (
    <div style={{ width: '100%', padding: '0', boxSizing: 'border-box' }}>
      <nav
        style={{
          marginBottom: '0px', // nav 아래쪽 마진 완전히 제거
        }}
      >
        {/* 네비게이션 내용 */}
      </nav>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0', // div 위쪽 마진 제거
          paddingTop: '0', // div 위쪽 패딩 제거
        }}
      >
        {/* 중복된 버튼 제거 */}
      </div>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          margin: '0rem', // 헤더 위쪽과 아래쪽 간격 모두 제거
        }}
      >
        게임 목록
      </h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {games.map((game) => (
          <li
            key={game.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.3rem', // 게임 카드 간 간격
              padding: '0.2rem', // 게임 카드 안쪽 여백
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              height: '50px', // 게임 카드 높이
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setSelected(game.id)}
              style={{
                flex: 1,
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#007BFF',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              {game.title}{' '}
              <a
                href={`http://lisyoen2.iptime.org:8000/uploads/${game.id}/index.html`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#007BFF',
                  fontSize: '0.7rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  marginLeft: '0.3rem',
                }}
              >
                🔗
              </a>
              <br />
              <span style={{ fontSize: '0.7rem', color: '#555' }}>
                ({new Date(game.createdAt).toLocaleDateString()})
              </span>
            </button>
            <button
              style={{
                marginLeft: '0.3rem',
                color: 'red',
                backgroundColor: 'white',
                border: '1px solid red',
                padding: '0.1rem 0.3rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={async () => {
                if (confirm('정말 삭제하시겠습니까?')) {
                  await fetch(`http://lisyoen2.iptime.org:8000/delete/${game.id}`, {
                    method: 'DELETE',
                  });
                  setGames((prev) => prev.filter((g) => g.id !== game.id));
                  alert('삭제되었습니다.');
                }
              }}
            >
              🗑️
            </button>
            <button
              onClick={() => setPrompt(game.prompt)}
              style={{
                marginLeft: '0.3rem',
                color: '#007BFF',
                backgroundColor: 'white',
                border: '1px solid #007BFF',
                padding: '0.1rem 0.3rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              💬
            </button>
          </li>
        ))}
      </ul>

      {prompt && (
        <div style={{ marginTop: '1rem' }}>
          <h2>프롬프트 내용</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: prompt.replace(/\n/g, '<br />'),
            }}
          />
          <button
            onClick={() => setPrompt(null)}
            style={{
              display: 'block',
              margin: '0 auto 1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            닫기
          </button>
        </div>
      )}

      {selected && (
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => setSelected(null)}
            style={{
              display: 'block',
              margin: '0 auto 1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ← 목록으로
          </button>
          <iframe
            src={`http://lisyoen2.iptime.org:8000/uploads/${selected}/index.html`}
            style={{
              width: '100%',
              height: 'calc(100vh - 48px)',
              border: 'none',
              display: 'block',
              maxWidth: '800px',
              margin: '0 auto',
            }}
            allowFullScreen
            title="game"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
