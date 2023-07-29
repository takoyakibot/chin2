import React, { useState, useEffect } from 'react';
import './style.css'; // スタイルシートをインポート

const CreateQuiz = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showRectangle, setShowRectangle] = useState(false);
  const [rectanglePosition, setRectanglePosition] = useState({ x: 0, y: 0 });

  // ページロード時にセッションストレージから保存された画像パス情報を取得
  useEffect(() => {
    const savedImagePath = sessionStorage.getItem('selectedImagePath');
    if (savedImagePath) {
      setSelectedImage(savedImagePath);
    }
  }, []);

  const handleImageSelect = (event) => {
    const imageFile = event.target.files[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
      // 選択した画像のパス情報をセッションストレージに保存
      sessionStorage.setItem('selectedImagePath', imageUrl);
    } else {
      setSelectedImage(null); // ファイル選択をキャンセルした場合、selectedImageをnullに設定
      sessionStorage.removeItem('selectedImagePath'); // キャンセル時に保存されたセッションストレージを削除
    }
  };

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRectanglePosition({ x, y });
    setShowRectangle(true);
  };

  return (
    <div className="container">
      <h1>クイズ作成</h1>
      <div className="image-select">
        {/* 画像選択フィールドの画像表示領域 */}
        {selectedImage && (
          <div style={{ position: 'relative' }}>
            <img src={selectedImage} alt="Selected" onClick={handleImageClick} />
            {showRectangle && (
              <div
                className="rectangle"
                style={{ top: `${rectanglePosition.y}px`, left: `${rectanglePosition.x}px` }}
              ></div>
            )}
          </div>
        )}
        {/* 画像選択ボタン */}
        <div className="image-select-button">
          <label htmlFor="filename" className="browse_btn">
            画像を選択
            <input type="file" id="filename" onChange={handleImageSelect} accept="image/*" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
