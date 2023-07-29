import React, { useState, useEffect } from 'react';
import './style.css'; // スタイルシートをインポート

const CreateQuiz = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // ページロード時にセッションストレージから保存された画像パス情報を取得
  useEffect(() => {
    const savedImagePath = sessionStorage.getItem('selectedImagePath');
    if (savedImagePath) {
      setSelectedImage(savedImagePath);
    }
  }, []);

  const handleImageSelect = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
    // 選択した画像のパス情報をセッションストレージに保存
    sessionStorage.setItem('selectedImagePath', imageUrl);
  };

  return (
    <div className="container">
      <h1>クイズ作成</h1>
      <div className="image-select">
        {/* 画像選択フィールドの画像表示領域 */}
        {selectedImage && <img src={selectedImage} alt="Selected" />}
        {/* 画像選択ボタン */}
        <div className="image-select-button">
          <input type="file" onChange={handleImageSelect} accept="image/*" />
          {/* 保存した画像のパス情報を表示 */}
          {selectedImage && <span>{selectedImage}</span>}
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
