import React, { useState, useEffect } from 'react';
import './style.css';

const CreateQuiz = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [quizInfo, setQuizInfo] = useState([]); // フセンの情報とクイズの回答を保持するステート
  const [showRectangle, setShowRectangle] = useState(false);
  const [rectanglePosition, setRectanglePosition] = useState({ x: 0, y: 0 });
  const [quizAnswer, setQuizAnswer] = useState('YES'); // クイズの回答を保持するステート

  // ページロード時にセッションストレージから保存された画像パス情報とフセン情報を取得
  useEffect(() => {
    const savedImagePath = sessionStorage.getItem('selectedImagePath');
    const savedQuizInfo = sessionStorage.getItem('quizInfo');
    if (savedImagePath) {
      setSelectedImage(savedImagePath);
    }
    if (savedQuizInfo) {
      setQuizInfo(JSON.parse(savedQuizInfo));
    }
  }, []);

  const handleImageSelect = (event) => {
    const imageFile = event.target.files[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
      // 選択した画像のパス情報をセッションストレージに保存
      sessionStorage.setItem('selectedImagePath', imageUrl);
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
    const confirmed = window.confirm('回答は"""YES"""でよろしいですか？　キャンセルを押すと、回答が"""No"""の状態で追加されます。あとから変更することも可能です。');
    var tempAnswer = 'NO';
    if (confirmed) {
      tempAnswer = 'YES';
    }
    const updatedQuizInfo = [
      ...quizInfo,
      { x: rectanglePosition.x, y: rectanglePosition.y, answer: tempAnswer, key: quizInfo.length + 1 }
    ];
    setQuizInfo(updatedQuizInfo);
    setShowRectangle(false); // 仮フセンを追加したら非表示にする
    // 更新したフセン情報を保存
    sessionStorage.setItem('quizInfo', JSON.stringify(updatedQuizInfo));
    // クイズ回答を初期値に戻す
    setQuizAnswer('YES');
  };

  const handleRemoveRectangle = (index) => {
    // 削除ボタンを押す前に警告を表示
    const confirmed = window.confirm('削除しますか？（番号がずれる場合があるので注意してください）');
    if (confirmed) {
      const newQuizInfo = quizInfo.filter((_, i) => i !== index);
      setQuizInfo(newQuizInfo);
      setShowRectangle(false); // 仮フセンを追加したら非表示にする
      // 更新したフセン情報を保存
      sessionStorage.setItem('quizInfo', JSON.stringify(newQuizInfo));
    }
  };

  const handleQuizAnswerChange = (event, index) => {
    const { value } = event.target;
    // 対象のフセンの回答を更新
    const updatedQuizInfo = [...quizInfo];
    updatedQuizInfo[index].answer = value;
    setQuizInfo(updatedQuizInfo);
    // 更新したフセン情報を保存
    sessionStorage.setItem('quizInfo', JSON.stringify(updatedQuizInfo));
  };

  const handleSave = () => {
    // selectedImageをローカルストレージに保存
    localStorage.setItem('selectedImage', selectedImage);

    // quizInfoをローカルストレージに保存
    localStorage.setItem('quizInfo', JSON.stringify(quizInfo));

    alert('保存しました！');
  };

  return (
    <div className="container">
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
              {quizInfo.map((info, index) => (
                <div key={index} style={{ position: 'absolute', top: `${info.y}px`, left: `${info.x}px` }}>
                  <div className="rectangle"></div>
                  <div className="index-text">{info.key}</div>
                </div>
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
              <div className="col d-flex align-items-center justify-content-center">
                一覧
              </div>
              <div className="col">
                {/* フセン追加ボタン */}
                <button disabled={!showRectangle} onClick={handleAddRectangle} className="btn btn-primary">
                  フセン追加
                </button>
              </div>
            </div>
            {/* クイズ一覧のコード */}
            <div>
              <div className="row quiz-header">
                <div className="col col-2">No</div>
                <div className="col">回答</div>
                <div className="col">削除</div>
              </div>
              {quizInfo.map((info, index) => (
                <div key={index} className="row quiz-item">
                  <div className="col col-2 d-flex align-items-center justify-content-center">
                    {info.key}</div>
                  <div className="col d-flex align-items-center justify-content-center">
                    <select value={info.answer} onChange={(e) => handleQuizAnswerChange(e, index)}>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                  <div className="col d-flex align-items-center justify-content-center">
                    <button onClick={() => handleRemoveRectangle(index)}
                       className="btn btn-danger btn-remove" style={{ padding: '0 12px' }}>
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12">
              <button onClick={handleSave} className="btn btn-info">
                保存
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
