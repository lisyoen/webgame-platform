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
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <h1>게임 목록</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <button onClick={() => setSelected(game.id)}>
              {game.title} ({new Date(game.createdAt).toLocaleDateString()})
            </button>
            <button
              style={{ marginLeft: '1rem', color: 'red' }}
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
          <button onClick={() => setSelected(null)}>← 목록으로</button>
          <iframe
            src={`http://lisyoen2.iptime.org:8000/uploads/${selected}/index.html`}
            style={{
              width: '100%',
              height: 'calc(100vh - 48px)',
              border: 'none',
              display: 'block',
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
