import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'; // ルーティングを使用する場合
import './style.css'; // 必要に応じてスタイリング

const Header = () => {
  return (
    <>
      <Helmet>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@takoyaki_dead" />
        <meta name="twitter:title" content="ち◯ちん見せちゃダメゲーム" />
        <meta name="twitter:description" content="ち◯ちん見せちゃダメゲームの問題を作成し、回答できるサイトです。" />
        <meta name="twitter:image" content="http://alpacasandbag.x.s3-website-ap-northeast-1.amazonaws.com/helmet.jpg" />
      </Helmet>
      <header className="header">
        <Link to="/chiochin">
          <img src="/logo.png" alt="Logo" className="header-logo" />
        </Link>
      </header>
    </>
  );
};

export default Header;
