import React, { useState, useEffect } from 'react';
import './style.css';
import Overlay from './Overlay';

const QuizCreatePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [quizInfo, setQuizInfo] = useState([]); // フセンの情報とクイズの回答を保持するステート
  const [showRectangle, setShowRectangle] = useState(false);
  const [rectanglePosition, setRectanglePosition] = useState({ x: 0, y: 0 });
  const [quizAnswer, setQuizAnswer] = useState('YES'); // クイズの回答を保持するステート
  const [showOverlay, setShowOverlay] = useState(false);
  const [quizName, setQuizName] = useState(''); // クイズの名前を保持するステート
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true); // 保存ボタンの非アクティブ状態を管理するステート

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

  // テキストボックスの値が変更されたときに実行される関数
  const handleQuizNameChange = (event) => {
    const { value } = event.target;
    setQuizName(value);
    setSaveButtonDisabled(value.trim() === ''); // テキストボックスが空欄でない場合、保存ボタンと読込ボタンを有効にする
  };

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
    var centering = 50
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left - centering;
    const y = event.clientY - rect.top - centering;

    setRectanglePosition({ x, y });
    setShowRectangle(true);
  };

  const handleAddRectangle = (e) => {
    if (!showRectangle || e.key && e.key !== 'Enter') {
      return;
    }

    const confirmed = window.confirm('回答は"""YES"""でよろしいですか？ キャンセルを押すと、回答が"""No"""の状態で追加されます。あとから変更することも可能です。');
    const tempAnswer = confirmed ? 'YES' : 'NO';
    const updatedQuizInfo = [
      ...quizInfo,
      { x: rectanglePosition.x, y: rectanglePosition.y, answer: tempAnswer }
    ];
    setQuizInfo(updatedQuizInfo);
    setShowRectangle(false); // 仮フセンを追加したら非表示にする
    // 更新したフセン情報を保存
    sessionStorage.setItem('quizInfo', JSON.stringify(updatedQuizInfo));
    // クイズ回答を初期値に戻す
    setQuizAnswer('YES');
  };

  // Enterキーのイベントハンドラを設定
  useEffect(() => {
    document.addEventListener('keydown', handleAddRectangle);
    return () => {
      document.removeEventListener('keydown', handleAddRectangle);
    };
  }, [rectanglePosition, quizInfo]);

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

  // 保存ボタンがクリックされたときに実行される関数
  const handleSaveQuiz = () => {
    if (quizName.trim() === '') return; // テキストボックスが空欄の場合は何もしない

    // クイズ名が一致するクイズ情報を検索する
    const savedQuizInfo = JSON.parse(localStorage.getItem('quizInfo')) || [];
    const foundQuiz = savedQuizInfo.find((info) => info.quizName === quizName);

    let newQuizInfo = [];
    if (foundQuiz) {
      const confirmed = window.confirm('すでに存在するクイズ名です。上書き保存しますか？');
      if (!confirmed) return; // キャンセルされた場合は何もしない

      // クイズ名が存在する場合、対応するクイズ情報を上書きする
      newQuizInfo = savedQuizInfo.map((info) =>
        info.quizName === quizName
          ? { quizName, selectedImage, fusens: quizInfo }
          : info
      );
    } else {
      // クイズ名が存在しない場合、新たにクイズ情報を追加する
      newQuizInfo = [...savedQuizInfo, { quizName, selectedImage, fusens: quizInfo }];
    }

    localStorage.setItem('quizInfo', JSON.stringify(newQuizInfo));

    // 保存したよメッセージ
    alert('クイズ情報を保存しました。');

    // 目いっぱいの祝福を君に
    setShowOverlay(true);
  };

  // 読込ボタンがクリックされたときに実行される関数
  const handleLoadQuiz = () => {
    if (quizName.trim() === '') return; // テキストボックスが空欄の場合は何もしない

    // クイズ名が一致するクイズ情報を検索する
    const savedQuizInfo = JSON.parse(localStorage.getItem('quizInfo')) || [];
    const foundQuiz = savedQuizInfo.find((info) => info.quizName === quizName);

    if (foundQuiz) {
      // クイズ情報が見つかった場合、画面に読み込んで表示する
    setSelectedImage(foundQuiz.selectedImage);
    setQuizInfo(foundQuiz.fusens); 

      alert('クイズ情報を読み込みました。');
    } else {
      alert('指定されたクイズ名の情報が見つかりません。');
    }
  };

  // Overlayを閉じる関数
  const handleCloseOverlay = () => {
    setShowOverlay(false);
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
                  <div className="index-text">{index + 1}</div>
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
                    {index + 1}</div>
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
            <div className="row footer-row">
              {/* テキストボックス */}
              <div className="col col-6">
                <input
                  type="text" className="quiz-name-input"
                  placeholder="クイズ名を入力"
                  value={quizName}
                  onChange={handleQuizNameChange}
                />
              </div>
              {/* 保存ボタン */}
              <div className="col col-3">
                <button disabled={saveButtonDisabled} className="btn btn-info" onClick={handleSaveQuiz}>
                  保存
                </button>
              </div>
              {/* 読込ボタン */}
              <div className="col col-3">
                <button disabled={saveButtonDisabled} className="btn btn-success" onClick={handleLoadQuiz}>
                  読込
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* アニメーションのオーバーレイ */}
      {showOverlay && <Overlay onCloseOverlay={handleCloseOverlay} />}
    </div>
  );
};

export default QuizCreatePage;
