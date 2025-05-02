import { useEffect, useState } from 'react';

type Game = {
  id: string;
  title: string;
  createdAt: string;
};

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://lisyoen2.iptime.org:8000/')
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div style={{ width: '100%', padding: '1rem', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.5rem' }}>게임 목록</h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {games.map((game) => (
          <li
            key={game.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
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
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              {game.title} ({new Date(game.createdAt).toLocaleDateString()})
            </button>
            <button
              style={{
                marginLeft: '1rem',
                color: 'white',
                backgroundColor: 'red',
                border: 'none',
                padding: '0.5rem 1rem',
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
              삭제
            </button>
          </li>
        ))}
      </ul>

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
