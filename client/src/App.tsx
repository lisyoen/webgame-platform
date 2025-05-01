import Home from './pages/Home';
import Upload from './pages/Upload';
import { useState } from 'react';

function App() {
  const [view, setView] = useState<'home' | 'upload'>('home');

  return (
    <div>
      <nav style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('home')}>게임 목록</button>
        <button onClick={() => setView('upload')}>게임 등록</button>
      </nav>
      {view === 'home' ? <Home /> : <Upload />}
    </div>
  );
}

export default App;
