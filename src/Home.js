import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const getQuizzesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('quizInfo')) || [];
};

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState(getQuizzesFromLocalStorage());
  const [answerData, setAnswerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuizzes(getQuizzesFromLocalStorage());
    setAnswerData(sessionStorage.getItem('answerData'));
  }, []);

  const editQuiz = (quiz) => {
    sessionStorage.setItem('savedData', JSON.stringify(quiz));
  };

  const answerQuiz = (quiz, index) => {
    // セッションがある場合は確認
    if (answerData) {
      // 確認メッセージを表示
      const isConfirmed = window.confirm('前回の回答情報が残っています。新たに始めると前回の情報は削除されますがよろしいですか？');
      
      // キャンセルが押された場合、関数を終了
      if (!isConfirmed) {
        return;
      }
    }

    // セッションがない場合、セットして遷移
    const updatedQuizInfo = [...quizzes];
    const currentDate = new Date().toISOString(); // 現在日時を取得
    updatedQuizInfo[index].answerDate = currentDate; // answerDateを更新
    localStorage.setItem('quizInfo', JSON.stringify(updatedQuizInfo)); // ローカルストレージに再保存
  
    sessionStorage.setItem('answerData', JSON.stringify(quiz));
    setQuizzes(updatedQuizInfo); // ステートを更新

    // ページ遷移
    navigate('/answer');
  };

  const createNewQuiz = () => {
    sessionStorage.removeItem('savedData');
  };

  const formatDate = (dateString) => {
    if (dateString === undefined) {
      return '';
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return (
      <>
        {`${year}/${month}/${day}`}<br />
        {`${hours}:${minutes}:${seconds}`}
      </>
    );
  };
  
  const resumeButton = (
    <button disabled={answerData ? false : true } className="btn btn-warning resume-quiz-button">
      回答を再開
    </button>
  );

  return (
    <div className="container">
      <div className="row mb-4 d-flex align-items-center quiz-list-button-row">
        <div className="col">
          <Link to="/create">
            <button onClick={createNewQuiz} className="btn btn-info new-quiz-button">
              クイズ新規作成
            </button>
          </Link>
          {answerData ? <Link to="/answer">{resumeButton}</Link> : resumeButton}
        </div>
      </div>
      <div className="m-2">
        <div className="row quiz-header">
          <div className="col col-1">No</div>
          <div className="col col-2">登録名</div>
          <div className="col col-1">設問数</div>
          <div className="col col-1">画像</div>
          <div className="col col-1">乳酸菌</div>
          <div className="col col-2">登録日</div>
          <div className="col col-1">編集</div>
          <div className="col col-2">回答日</div>
          <div className="col col-1">回答</div>
        </div>
        {quizzes.map((quiz, index) => (
        <div key={index} className="row quiz-item">
          <div className="col col-1 d-flex align-items-center justify-content-center">{index + 1}</div>
          <div className="col col-2 d-flex align-items-center justify-content-center">{quiz.quizName}</div>
          <div className="col col-1 d-flex align-items-center justify-content-center">{quiz.quizInfo.length}</div>
          <div className="col col-1 d-flex align-items-center justify-content-center">
            <img src={quiz.thumbnail} alt="quiz thumbnail" className="thumbnail"/>
          </div>
          <div className="col col-1 d-flex align-items-center justify-content-center">
            {quiz.stickerImage && <img src={quiz.stickerImage} alt="sticker thumbnail" className="thumbnail"/>}
          </div>
          <div className="col col-2 d-flex align-items-center justify-content-center">{formatDate(quiz.updDate)}</div>
          <div className="col col-1 d-flex align-items-center justify-content-center">
            <Link to="/create">
              <button className="btn btn-success" onClick={() => editQuiz(quiz)}>
                編集
              </button>
            </Link>
          </div>
          <div className="col col-2 d-flex align-items-center justify-content-center">{formatDate(quiz.answerDate)}</div>
          <div className="col col-1 d-flex align-items-center justify-content-center">
            <button className="btn btn-danger" onClick={() => answerQuiz(quiz, index)}>
              回答
            </button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default QuizListPage;
