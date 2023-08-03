import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizListPage from './Home';
import QuizCreatePage from './CreateQuiz';
import QuizAnswerPage from './QuizAnswer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizListPage />} />
        <Route path="/create" element={<QuizCreatePage />} />
        <Route path="/answer" element={<QuizAnswerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
