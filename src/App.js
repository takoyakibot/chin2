import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import CreateQuiz from './CreateQuiz';
import './style.css'; // 共通のスタイルシートを読み込む

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to="/create-quiz">クイズ作成</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
