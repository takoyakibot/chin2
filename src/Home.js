import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // 共通のスタイルシートを読み込む

const Home = () => {
  return (
    <div>
      <h1>クイズアプリ</h1>
      <p>ようこそ！クイズを作成して楽しもう！</p>
      <Link to="/create-quiz">クイズ作成</Link>
    </div>
  );
};

export default Home;
