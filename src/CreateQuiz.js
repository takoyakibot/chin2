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
      setRectangles([...rectangles, rectanglePosition]);
      setShowRectangle(false); // 仮フセンを追加したら非表示にする
  };

  const handleRemoveRectangle = (index) => {
    const newRectangles = rectangles.filter((_, i) => i !== index);
    setRectangles(newRectangles);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">クイズ作成</h1>
      <div className="row">
        <div className="col-md-8 mb-4">
          {/* 画像選択フィールドの画像表示領域 */}
          {selectedImage && (
            <div style={{ position: 'relative' }}>
              <img src={selectedImage} alt="Selected" onClick={handleImageClick} className="image-select" />
              {showRectangle && (
                <div
                  className="rectangle" // 仮フセンのスタイル
                  style={{ top: `${rectanglePosition.y}px`, left: `${rectanglePosition.x}px`, opacity: 0.5 }}
                ></div>
              )}
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
          <button disabled={!showRectangle} onClick={handleAddRectangle} className="btn btn-primary">
            フセンを追加
          </button>
        </div>
        <div className="col-md-4">
          {/* クイズ一覧フィールド */}
          <div className="quiz-list">
            <h2>クイズ一覧</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>クイズ番号</th>
                  <th>フセン座標</th>
                  <th>クイズの答え</th>
                  <th>削除</th>
                </tr>
              </thead>
              <tbody>
                {rectangles.map((rect, index) => (
                  <tr key={index}>
                    <td>フセン {index + 1}</td>
                    <td>X: {rect.x}, Y: {rect.y}</td>
                    <td>クイズの答え</td>
                    <td>
                      <button onClick={() => handleRemoveRectangle(index)} className="btn btn-danger">削除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
