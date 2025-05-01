// File: src/pages/Home.tsx
import { useEffect, useState } from 'react';

const Home = () => {
  const [games, setGames] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://lisyoen2.iptime.org:3000/')
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)}>← 목록으로</button>
        <iframe
          src={`http://lisyoen2.iptime.org:3000/uploads/${selected}/index.html`}
          style={{ width: '100%', height: '90vh', border: 'none' }}
          title="game"
        />
      </div>
    );
  }

  return (
    <div>
      <h1>게임 목록</h1>
      <ul>
        {games.map((id) => (
          <li key={id}>
            <button onClick={() => setSelected(id)}>{id}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
