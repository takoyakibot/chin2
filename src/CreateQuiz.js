import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistoryからuseNavigateに変更
import './style.css'; // 共通のスタイルシートを読み込む

const CreateQuiz = () => {
  const navigate = useNavigate(); // useHistoryからuseNavigateに変更
  const [quizData, setQuizData] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddQuiz = () => {
    const newQuizData = [...quizData, { question, answer }];
    setQuizData(newQuizData);
    setQuestion('');
    setAnswer('');
  };

  const handleSaveQuiz = () => {
    // ここでクイズデータを保存するAPIを呼び出す処理を書く（モックの場合は省略）
    console.log('クイズデータを保存しました:', quizData);
    navigate('/'); // useHistoryからnavigateに変更
  };

  return (
    <div>
      <h1>クイズ作成</h1>
      <div>
        <input
          type="text"
          placeholder="質問"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="答え"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleAddQuiz}>追加</button>
      </div>
      <div>
        <h2>クイズ一覧</h2>
        {quizData.map((quiz, index) => (
          <div key={index}>
            <span>{index + 1}. 質問: {quiz.question}, 答え: {quiz.answer}</span>
          </div>
        ))}
      </div>
      <button onClick={handleSaveQuiz}>保存</button>
    </div>
  );
};

export default CreateQuiz;
