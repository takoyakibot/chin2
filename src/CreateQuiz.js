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
    const savedRectangles = sessionStorage.getItem('rectangles');
    if (savedImagePath) {
      setSelectedImage(savedImagePath);
    }
    if (savedRectangles) {
        setRectangles(JSON.parse(savedRectangles));
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
    const updatedRectangles = [...rectangles, rectanglePosition];
    setRectangles(updatedRectangles);
    setShowRectangle(false); // 仮フセンを追加したら非表示にする
    //更新したフセンを保存
    sessionStorage.setItem('rectangles', JSON.stringify(updatedRectangles));
  };

  const handleRemoveRectangle = (index) => {
    const newRectangles = rectangles.filter((_, i) => i !== index);
    setRectangles(newRectangles);
    //更新したフセンを保存
    sessionStorage.setItem('rectangles', JSON.stringify(newRectangles));
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">クイズ作成</h1>
      <div className="row">
        <div className="col-lg-8 mb-4">
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
        </div>
        <div className="col-lg-4">
          {/* クイズ一覧フィールド */}
          <div className="quiz-list">
            <div className="row mb-2">
              <div className="col d-flex align-items-center justify-content-center">クイズ一覧</div>
              <div className="col">
                {/* フセン追加ボタン */}
                <button disabled={!showRectangle} onClick={handleAddRectangle} className="btn btn-primary">
                  フセン追加
                </button>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>回答</th>
                  <th>削除</th>
                </tr>
              </thead>
              <tbody>
                {rectangles.map((rect, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
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
