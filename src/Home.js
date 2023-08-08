import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const getQuizzesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('quizInfo')) || [];
};

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState(getQuizzesFromLocalStorage());

  useEffect(() => {
    setQuizzes(getQuizzesFromLocalStorage());
  }, []);

  const editQuiz = (quiz) => {
    sessionStorage.setItem('savedData', JSON.stringify(quiz));
  };

  const answerQuiz = (quiz) => {
    sessionStorage.setItem('answerData', JSON.stringify(quiz));
  };

  const createNewQuiz = () => {
    sessionStorage.removeItem('savedData'); // キーを'savedData'に変更, 情報をクリア！
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col col-2">
          <Link to="/create">
            <button onClick={createNewQuiz} className="btn btn-info new-quiz-button">
              クイズ新規作成
            </button>
          </Link>
        </div>
      </div>
      <div className="m-2">
        <div className="row quiz-header">
          <div className="col col-1">No</div>
          <div className="col col-2">登録名</div>
          <div className="col col-1">付箋</div>
          <div className="col col-1"></div>
          <div className="col col-2">登録日</div>
          <div className="col col-1">編集</div>
          <div className="col col-2">回答日</div>
          <div className="col col-1">正解数</div>
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
          <div className="col col-2 d-flex align-items-center justify-content-center">{quiz.updDate}</div>
          <div className="col col-1 d-flex align-items-center justify-content-center">
            <Link to="/create">
              <button className="btn btn-success" onClick={() => editQuiz(quiz)}>
                編集
              </button>
            </Link>
          </div>
          <div className="col col-2 d-flex align-items-center justify-content-center">{quiz.answered}</div>
          <div className="col col-1 d-flex align-items-center justify-content-center">{quiz.correctCount}</div>
          <div className="col col-1 d-flex align-items-center justify-content-center">
            <Link to="/answer">
              <button className="btn btn-danger" onClick={() => answerQuiz(quiz)}>
                回答
              </button>
            </Link>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default QuizListPage;
