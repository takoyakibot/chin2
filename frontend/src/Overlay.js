import React, { useState } from 'react';
import './overlay.css';

const Overlay = ({ correctAnswer, showOverlay, onCloseOverlay }) => {
  const [gifName, setGifName] = useState(correctAnswer);

  // オーバーレイがクリックされたときに閉じる処理
  const handleClickOverlay = (event) => {
    // オーバーレイの外側をクリックした場合は閉じる
    if (event.target.classList.contains('overlay')) {
      // URLを変更する
      setGifName('');

      onCloseOverlay();
    }
  };

  return (
    <div className={`overlay ${showOverlay ? 'active' : ''}`} onClick={handleClickOverlay}>
      <div className="overlay-content">
        <div className="close-button" onClick={onCloseOverlay}>x</div>
        <div className="overlay">
          <img src={process.env.PUBLIC_URL + '/images/' + gifName + '.gif?start=1'} alt="Animation" />
        </div>
      </div>
    </div>
  );
};

export default Overlay;
