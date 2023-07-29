import React, { useState, useEffect } from 'react';
import './style.css';

const CreateQuiz = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [rectangles, setRectangles] = useState([]);
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

  const handleAddRectangle = () => {
    if (rectangles.length < 2) {
      setRectangles([...rectangles, rectanglePosition]);
    }
  };

  return (
    <div className="container">
      <h1>クイズ作成</h1>
      <div className="image-select">
        {/* 画像選択フィールドの画像表示領域 */}
        {selectedImage && (
          <div style={{ position: 'relative' }}>
            <img src={selectedImage} alt="Selected" onClick={handleImageClick} />
            {rectangles.map((rect, index) => (
              <div
                key={index}
                className="rectangle"
                style={{ top: `${rect.y}px`, left: `${rect.x}px` }}
              ></div>
            ))}
          </div>
        )}
        {/* 画像選択ボタン */}
        <div className="image-select-button">
          <label htmlFor="filename" className="browse_btn">
            画像を選択
            <input type="file" id="filename" onChange={handleImageSelect} accept="image/*" />
          </label>
        </div>
        {/* フセン追加ボタン */}
        <button onClick={handleAddRectangle}>フセンを追加</button>
      </div>
      {/* クイズ一覧フィールド */}
      <div className="quiz-list">
        <h2>クイズ一覧</h2>
        <table>
          <thead>
            <tr>
              <th>クイズ番号</th>
              <th>フセン座標</th>
              <th>クイズの答え</th>
              <th>編集</th>
              <th>確定</th>
            </tr>
          </thead>
          <tbody>
            {rectangles.map((rect, index) => (
              <tr key={index}>
                <td>フセン {index + 1}</td>
                <td>X: {rect.x}, Y: {rect.y}</td>
                <td>クイズの答え</td>
                <td>
                  {/* <button onClick={() => handleFusenMouseDown(index)} disabled={isDragging}>
                    編集
                  </button> */}
                </td>
                <td>
                  {/* {quiz.editing && (
                    <button onClick={() => handleConfirmFusen(index)}>確定</button>
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateQuiz;
