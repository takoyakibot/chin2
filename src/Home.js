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
    // route to createQuiz page
  };

  return (
    <div>
      {quizzes.map((quiz, index) => (
        <div key={index} className="quiz-row">
          <div className="quiz-index">{index + 1}</div>
          <div className="quiz-name">
            <a href={`https://www.google.com/?q=${quiz.quizName}`}>
              {quiz.quizName}
            </a>
          </div>
          <div className="quiz-sticky-count">{quiz.stickyCount}</div>
          <div className="quiz-thumbnail">
            <img src={quiz.thumbnail} alt="quiz thumbnail"/>
          </div>
          <div className="quiz-updated">{quiz.updated}</div>
          <div className="quiz-answered">{quiz.answered}</div>
          <div className="quiz-correct-count">{quiz.correctCount}</div>
          <button className="edit-button" onClick={() => editQuiz(quiz)}>
            編集
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizListPage;
