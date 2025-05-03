import Home from './pages/Home';
import Upload from './pages/Upload';
import { useState } from 'react';

function App() {
  const [view, setView] = useState<'home' | 'upload'>('home');

  return (
    <div>
      <nav style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => setView('home')}>게임 목록</button>
        <button onClick={() => setView('upload')}>게임 등록</button>
        <a
          href="https://docs.google.com/presentation/d/1d0iDklL16CxEGQyZHAkgmGgxzdpjkqZqkc7kyqCJeRI/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: '#007BFF',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          도움말
        </a>
      </nav>
      {view === 'home' ? <Home /> : <Upload />}
    </div>
  );
}

export default App;
