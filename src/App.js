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
          <Route path="/chiochin" element={<QuizListPage />} />
          <Route path="/chiochin/create" element={<QuizCreatePage />} />
          <Route path="/chiochin/answer" element={<QuizAnswerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
