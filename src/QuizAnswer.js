import React, { useEffect, useState } from 'react';
import Overlay from './Overlay';

const QuizCreatePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [quizInfo, setQuizInfo] = useState([]); // フセンの情報とクイズの回答を保持するステート
  const [selectRectangle, setSelectRectangle] = useState(false);
  const [rectanglePosition, setRectanglePosition] = useState({ x: 0, y: 0 });
  const [quizAnswer, setQuizAnswer] = useState('YES'); // クイズの回答を保持するステート
  const [showOverlay, setShowOverlay] = useState(false);
  const [quizName, setQuizName] = useState(''); // クイズの名前を保持するステート
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true); // 保存ボタンの非アクティブ状態を管理するステート
  const [thumbnail, setThumbnail] = useState(null); // サムネイルを保存するステート
  const [selectedAnswer, setSelectedAnswer] = useState('NO');

  // ページロード時にセッションストレージから保存された画像パス情報とフセン情報を取得
  useEffect(() => {
    const answerData = sessionStorage.getItem('answerData');
    if (answerData) {
      const parsedData = JSON.parse(answerData);
      const { quizName, selectedImage, quizInfo } = parsedData;
      if (selectedImage) {
        setSelectedImage(selectedImage);
      }
      if (quizInfo) {
        setQuizInfo(quizInfo);
      }
      if (quizName) {
        setQuizName(quizName);
        setSaveButtonDisabled(quizName.trim() === '');
      }
    }
  }, []);

  // テキストボックスの値が変更されたときに実行される関数
  const handleQuizNameChange = (event) => {
    const { value } = event.target;
    setQuizName(value);
    setSaveButtonDisabled(value.trim() === ''); // テキストボックスが空欄でない場合、保存ボタンと読込ボタンを有効にする
  };
  
  const handleRectangleClick = (index) => {
    // 一旦false
    var isEnabled = false;

    // クリックしたRectangleのcolorを変更する
    const updateQuizInfo = quizInfo.map((item, i) => {
      if (index === i && item.color !== 'pink') {
        // pinkにした場合はボタンを押せるようにする
        isEnabled = true;
        return {
            ...item,
            color: 'pink'
        };
      } else {
        return {
            ...item,
            color: 'white'
        };
      }
    });

    setSelectRectangle(isEnabled);
    setQuizInfo(updateQuizInfo);
  }

  const handleImageClick = (event) => {
    setSelectRectangle(false);
    // クリックしたRectangleのcolorを変更する
    const updateQuizInfo = quizInfo.map((item, i) => {
      return {
          ...item,
          color: 'white'
      };
    });

    setQuizInfo(updateQuizInfo);
  };

  const handleQuizAnser = (e) => {
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


    // // 保存したよメッセージ
    // alert('クイズ情報を保存しました。');

    // // 目いっぱいの祝福を君に
    // setShowOverlay(true);

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
              <img src={selectedImage} alt="Selected" className="image-select"
               onClick={handleImageClick}/>
              {quizInfo.map((info, index) => (
                <div key={index} style={{ position: 'absolute', top: `${info.y}px`, left: `${info.x}px` }}
                onClick={() => handleRectangleClick(index)}>
                  <div className="rectangle" style={{ backgroundColor: info.color }}></div>
                  <div className="index-text">{index + 1}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-4">
          {/* クイズ一覧フィールド */}
          <div className="quiz-list">
            <div className="row mb-2">
              <div className="col d-flex align-items-center justify-content-center">
                一覧
              </div>
              <div className="col d-flex align-items-center justify-content-center">
                <select value={selectedAnswer}>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="col">
                {/* 回答ボタン */}
                <button disabled={!selectRectangle} onClick={handleQuizAnser} className="btn btn-primary">
                  回答
                </button>
              </div>
            </div>
            {/* クイズ一覧のコード */}
            <div>
              <div className="row quiz-header">
                <div className="col col-2">No</div>
                <div className="col">回答</div>
                <div className="col">結果</div>
              </div>
              {quizInfo.map((info, index) => (
                <div key={index} className="row quiz-item" style={{ backgroundColor: info.color }}
                 onClick={() => handleRectangleClick(index)}>
                  <div className="col col-2 d-flex align-items-center justify-content-center">
                    {index + 1}</div>
                  <div className="col d-flex align-items-center justify-content-center">
                    {info.answered && <select disabled="true" value={info.answered} onChange={(e) => handleQuizAnswerChange(e, index)}>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>}
                  </div>
                  <div className="col d-flex align-items-center justify-content-center">
                    {info.answered && info.answered === info.answer && <span className="text-success">正解</span>}
                    {info.answered && info.answered !== info.answer && <span className="text-danger">不正解</span>}
                  </div>
                </div>
              ))}
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
