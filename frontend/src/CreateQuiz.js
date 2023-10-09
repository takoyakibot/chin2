import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const QuizCreatePage = () => {
  const [quizId, setQuizId] = useState(''); // クイズのIDを保持するステート
  const [quizName, setQuizName] = useState(''); // クイズの名前を保持するステート
  const [selectedImage, setSelectedImage] = useState(null);
  const [stickerImage, setStickerImage] = useState(null);
  const [quizInfo, setQuizInfo] = useState([]); // フセンの情報とクイズの回答を保持するステート
  const [showRectangle, setShowRectangle] = useState(false);
  const [rectanglePosition, setRectanglePosition] = useState({ x: 0, y: 0 });
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true); // 保存ボタンの非アクティブ状態を管理するステート
  const maxK = 200;
  const centering = 50;

  // ページロード時にセッションストレージから保存された画像パス情報とフセン情報を取得
  useEffect(() => {
    (async () => {
      await sessionLoad();
    })();
  }, []);

  const sessionLoad = async () => {
    const preParseData = sessionStorage.getItem('savedData');
    if (preParseData) {
      const { id, quizName, selectedImage, stickerImage, quizInfo } = JSON.parse(preParseData);
      if (id) {
        setQuizId(id);
      }
      if (quizName) {
        setQuizName(quizName);
        setSaveButtonDisabled(quizName.trim() === '');
      }
      if (selectedImage) {
        setSelectedImage(selectedImage);
      } else {
        // selectedImageが存在しない場合、APIを叩いて画像を取得
        const response = await axios.get(`http://localhost:3000/api/games/${id}/image`);
        const data = await response.json();
        const base64Image = data.base64Image; // APIのレスポンスからbase64形式の画像を取得
        setSelectedImage(base64Image);
      }
      if (stickerImage) {
        setStickerImage(stickerImage);
      }
      if (quizInfo) {
        setQuizInfo(quizInfo);
      }
    }
  };

  useEffect(() => {
    sessionStorage.setItem('savedData', JSON.stringify(
      {
        id: quizId,
        quizName: quizName,
        selectedImage: selectedImage,
        stickerImage: stickerImage,
        quizInfo: quizInfo
      }
    ));
  }, [quizId, quizName, selectedImage, stickerImage, quizInfo]);

  // テキストボックスの値が変更されたときに実行される関数
  const handleQuizNameChange = (event) => {
    const { value } = event.target;
    setQuizName(value);
    setSaveButtonDisabled(value.trim() === ''); // テキストボックスが空欄でない場合、保存ボタンと読込ボタンを有効にする
  };
  
  const handleImageSelect = (event) => {
    const imageFile = event.target.files[0];
  
    if (imageFile) {
      // サイズ上限を設定
      const maxSize = maxK * 1024;
  
      // ファイルサイズが上限を超えているかチェック
      if (imageFile.size > maxSize) {
        alert('付箋のサイズは一旦'+maxK+'KB以下である必要があります。');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
      };
      reader.readAsDataURL(imageFile);
    }
  };
  
  const handleStickerSelect = (event) => {
    const imageFile = event.target.files[0];
  
    if (imageFile) {
      // サイズ上限を設定
      const maxSize = maxK * 1024;
  
      // ファイルサイズが上限を超えているかチェック
      if (imageFile.size > maxSize) {
        alert('付箋のサイズは一旦'+maxK+'KB以下である必要があります。');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64Image = reader.result;
        setStickerImage(base64Image);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const createThumbnail = (base64Image) => {
    return new Promise((resolve, reject) => {
      const imgElement = document.createElement('img');
      imgElement.src = base64Image;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      imgElement.onload = () => {
        // 長辺を設定する
        const pnt = 10;
        if (imgElement.width > imgElement.height) {
          canvas.width = pnt;
          canvas.height = imgElement.height * (pnt / imgElement.width);
        } else {
          canvas.height = pnt;
          canvas.width = imgElement.width * (pnt / imgElement.height);
        }
        ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
        
        // サムネイルをBase64に変換
        resolve(canvas.toDataURL());  // 処理が終わったらPromiseを解決する
      };
    });
  };

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left - centering;
    const y = event.clientY - rect.top - centering;

    setRectanglePosition({ x, y });
    setShowRectangle(true);
  };

  const handleAddRectangle = (e) => {
    if (!showRectangle || (e.key && e.key !== 'Enter')) {
      return;
    }

    const confirmed = window.confirm('回答は"""YES"""でよろしいですか？ キャンセルを押すと、回答が"""No"""の状態で追加されます。あとから変更することも可能です。');
    const tempAnswer = confirmed ? 'YES' : 'NO';
    const updatedQuizInfo = [
      ...quizInfo,
      { x: rectanglePosition.x, y: rectanglePosition.y, answer: tempAnswer, size: centering }
    ];
    setQuizInfo(updatedQuizInfo);
    setShowRectangle(false); // 仮フセンを追加したら非表示にする
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
      const updatedQuizInfo = quizInfo.filter((_, i) => i !== index);
      setQuizInfo(updatedQuizInfo);
      setShowRectangle(false); // 仮フセンを追加したら非表示にする
    }
  };

  // クイズの回答を更新
  const handleQuizAnswerChange = (event, index) => {
    const { value } = event.target;
    // 対象のフセンの回答を更新
    const updatedQuizInfo = [...quizInfo];
    updatedQuizInfo[index].answer = value;
    setQuizInfo(updatedQuizInfo);
  };

  // 保存ボタンがクリックされたときに実行される関数
  const handleSaveQuiz = async () => {  // 非同期処理なのでasyncを追加
    if (quizName.trim() === '') return;

    // サムネイル作成はこちらで呼び出す
    const thumbnail = await createThumbnail(selectedImage);  // 非同期処理なのでawaitを使う

    // クイズの新しいデータオブジェクトを作成
    const newQuizData = {
      id: quizId,
      quizName,
      selectedImage,
      thumbnail,
      stickerImage,
      updDate: new Date(),
      quizInfo
    };

    try {
      // クイズデータを保存
      // idが存在すれば更新、なければ新規作成
      var response;
      if (quizId === '') {
        response = await axios.post('http://localhost:3000/api/games', newQuizData);
      } else {
        response = await axios.put('http://localhost:3000/api/games', newQuizData);
      }

      if (response.status === 200) {
        alert('クイズ情報を保存しました。');
      } else {
        alert('何らかの問題が発生しました。' + response);
      }
    } catch (error) {
      console.error('エラーが発生:', error);
      alert('クイズの保存に失敗しました。');
    }
  };
  
  // サイズ変更のハンドラー
  const handleSizeChange = (e, index) => {
    const newSize = e.target.value;
    const sQuiz = quizInfo[index];
    setQuizInfo(prev => prev.map((info, i) => (i === index ? { ...info,
      x: sQuiz.x + sQuiz.size - parseInt(newSize),
      y: sQuiz.y + sQuiz.size - parseInt(newSize),
      size: parseInt(newSize)} : info
    )));
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
                <div
                  className="rectangle rectangle-create"
                  style={stickerImage ? {
                      backgroundImage: `url(${stickerImage})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: 'transparent',
                      border: 0,
                      width: `${info.size * 2}px`,
                      height: `${info.size * 2}px`
                  } : {}}
                ></div>
                <div className="index-text">{index + 1}</div>
              </div>
            ))}
          </div>
          )}
          <div className="d-flex">
            {/* 画像選択ボタン */}
            <div className="m-2">
              <label htmlFor="filename" className="browse_btn">
                画像を選択
                <input type="file" id="filename" onChange={handleImageSelect} accept="image/*" />
              </label>
            </div>
            {/* フセン選択ボタン */}
            <div className="m-2">
              <label htmlFor="stickerfile" className="browse_btn">
                フセンを選択
                <input type="file" id="stickerfile" onChange={handleStickerSelect} accept="image/*" />
              </label>
            </div>
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
                <div className="col">サイズ</div>
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
                    <input
                      type="number"
                      value={info.size}
                      onChange={(e) => handleSizeChange(e, index)}
                      min="0"
                      max="600"
                    />
                  </div>
                  <div className="col d-flex align-items-center justify-content-center">
                    <button onClick={() => handleRemoveRectangle(index)}
                       className="btn btn-danger btn-remove">
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
              <div className="col col-8">
                <input
                  type="text" className="quiz-name-input"
                  placeholder="タイトル"
                  value={quizName}
                  onChange={handleQuizNameChange}
                />
              </div>
              {/* 保存ボタン */}
              <div className="col col-4">
                <button disabled={saveButtonDisabled} className="btn btn-info" onClick={handleSaveQuiz}>
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCreatePage;
