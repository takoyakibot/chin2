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
    sessionStorage.setItem('quizToEdit', JSON.stringify(quiz));
    // route to QuizCreate page
  };

  const createNewQuiz = () => {
    sessionStorage.removeItem('quizToEdit'); // 情報をクリア！
    // route to QuizCreate page
  };

  return (
    <div>
      <Link to="/create">
        <button onClick={createNewQuiz} className="new-quiz-button">
          クイズ新規作成
        </button>
      </Link>

      {quizzes.map((quiz, index) => (
        <div key={index} className="quiz-row">
          <div className="quiz-index">{index + 1}</div>
          <div className="quiz-name">
            <Link to={`/answer?quizName=${quiz.quizName}`}>{quiz.quizName}</Link>
          </div>
          <div className="quiz-sticky-count">{quiz.stickyCount}</div>
          <div className="quiz-thumbnail">
            <img src={quiz.thumbnail} alt="quiz thumbnail"/>
          </div>
          <div className="quiz-updated">{quiz.updated}</div>
          <div className="quiz-answered">{quiz.answered}</div>
          <div className="quiz-correct-count">{quiz.correctCount}</div>
          <div>
            <Link to="/create">
              <button className="edit-button" onClick={() => editQuiz(quiz)}>
                編集
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizListPage;
