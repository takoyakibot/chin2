import React from 'react';
import { Link } from 'react-router-dom'; // ルーティングを使用する場合
import './style.css'; // 必要に応じてスタイリング

const Header = () => {
  return (
    <header className="header">
      <Link to="/chiochin">
        <img src="/logo.png" alt="Logo" className="header-logo" />
      </Link>
    </header>
  );
};

export default Header;
