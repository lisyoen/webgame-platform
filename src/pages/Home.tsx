// File: src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>← 목록으로</button>
      <iframe
        src={`http://lisyoen2.iptime.org:8000/uploads/${id}/index.html`}
        style={{ width: '100%', height: '90vh', border: 'none' }}
        title="game"
      />
    </div>
  );
};

const GameList = () => {
  const [games, setGames] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://lisyoen2.iptime.org:8000/')
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  const handleGameClick = (id: string) => {
    // URL을 변경하고 GameDetail로 이동
    navigate(`/game/${id}/`);
  };

  return (
    <div>
      <h1>게임 목록</h1>
      <ul>
        {games.map((id) => (
          <li key={id}>
            <button onClick={() => handleGameClick(id)}>{id}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/game/:id/" element={<GameDetail />} />
      </Routes>
    </Router>
  );
};

export default Home;
