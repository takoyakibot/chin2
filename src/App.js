import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizListPage from './Home';
import QuizCreatePage from './CreateQuiz';
import QuizAnswerPage from './QuizAnswer';
import Header from './Header';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<QuizListPage />} />
          <Route path="/create" element={<QuizCreatePage />} />
          <Route path="/answer" element={<QuizAnswerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
