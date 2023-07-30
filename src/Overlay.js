import React from 'react';
import './overlay.css';
import YouTube from 'react-youtube';

const Overlay = ({ showOverlay, onCloseOverlay }) => {
  const videoId = 'wp7EmUj6f6Y'; // YouTubeの動画IDを指定してください

  // YouTubeのプレーヤーが準備完了したときに実行されるコールバック関数
  const onReady = (event) => {
    // プレーヤーのインスタンスにアクセスできる
    const player = event.target;
    // 動画を再生
    player.playVideo();
  };

  // オーバーレイがクリックされたときに閉じる処理
  const handleClickOverlay = (event) => {
    // オーバーレイの外側をクリックした場合は閉じる
    if (event.target.classList.contains('overlay')) {
      onCloseOverlay();
    }
  };

  return (
    <div className={`overlay ${showOverlay ? 'active' : ''}`} onClick={handleClickOverlay}>
      <div className="overlay-content">
        <div className="close-button" onClick={onCloseOverlay}>
          ×
        </div>
        <YouTube
          videoId={videoId}
          opts={{
            height: '360',
            width: '640',
            playerVars: {
              // 埋め込み動画の設定（必要に応じて追加）
            },
          }}
          onReady={onReady} // プレーヤーの準備完了時に実行されるコールバック関数を指定
        />
      </div>
    </div>
  );
};

export default Overlay;
