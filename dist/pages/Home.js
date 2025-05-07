"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// File: src/pages/Home.tsx
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const GameDetail = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<div>
      <button onClick={() => navigate('/')}>← 목록으로</button>
      <iframe src={`http://lisyoen2.iptime.org:8000/uploads/${id}/index.html`} style={{ width: '100%', height: '90vh', border: 'none' }} title="game"/>
    </div>);
};
const GameList = () => {
    const [games, setGames] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        fetch('http://lisyoen2.iptime.org:8000/')
            .then((res) => res.json())
            .then((data) => setGames(data));
    }, []);
    const handleGameClick = (id) => {
        // URL을 변경하고 GameDetail로 이동
        navigate(`/game/${id}/`);
    };
    return (<div>
      <h1>게임 목록</h1>
      <ul>
        {games.map((id) => (<li key={id}>
            <button onClick={() => handleGameClick(id)}>{id}</button>
          </li>))}
      </ul>
    </div>);
};
const Home = () => {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<GameList />}/>
        <react_router_dom_1.Route path="/game/:id/" element={<GameDetail />}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = Home;
