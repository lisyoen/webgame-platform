"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Home_1 = __importDefault(require("./pages/Home"));
const Upload_1 = __importDefault(require("./pages/Upload"));
const react_1 = require("react");
function App() {
    const [view, setView] = (0, react_1.useState)('home');
    return (<div>
      <nav style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('home')}>게임 목록</button>
        <button onClick={() => setView('upload')}>게임 업로드</button>
      </nav>
      {view === 'home' ? <Home_1.default /> : <Upload_1.default />}
    </div>);
}
exports.default = App;
