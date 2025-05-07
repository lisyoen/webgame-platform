"use strict";
// src/pages/Upload.tsx
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Upload = () => {
    const [file, setFile] = (0, react_1.useState)(null);
    const [gameId, setGameId] = (0, react_1.useState)(null);
    const [gameTitle, setGameTitle] = (0, react_1.useState)('');
    const [htmlCode, setHtmlCode] = (0, react_1.useState)('');
    const [prompt, setPrompt] = (0, react_1.useState)('');
    const handleUpload = async () => {
        if (!gameTitle || !htmlCode || !prompt)
            return alert('모든 필드를 채워주세요.');
        const res = await fetch('http://lisyoen2.iptime.org:8000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: gameTitle, html: htmlCode, prompt }),
        });
        const data = await res.json();
        setGameId(data.id);
    };
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://lisyoen2.iptime.org:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: 'example' }),
            });
            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }
            const result = await response.json();
            console.log(result);
        }
        catch (error) {
            console.error('요청 실패:', error);
        }
    };
    if (gameId) {
        return (<div>
        <h2>게임 등록 완료! 게임 실행</h2>
        <iframe src={`http://lisyoen2.iptime.org:3000/uploads/${gameId}/index.html`} style={{ width: '100%', height: '90vh', border: 'none' }} title="game"/>
      </div>);
    }
    return (<div>
      <h1>게임 등록</h1>
      <input type="text" placeholder="게임 제목" value={gameTitle} onChange={(e) => setGameTitle(e.target.value)}/>
      <textarea placeholder="게임 HTML 코드" value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)}/>
      <textarea placeholder="프롬프트" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
      <button onClick={handleUpload}>게임 등록</button>
    </div>);
};
exports.default = Upload;
