import React, { useEffect, useState } from 'react';
import Overlay from './Overlay';
// import QuizCard from './QuizCard';

const QuizAnswerPage = () => {
  const [quizInfo, setQuizInfo] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayImage, setOverlayImage] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [players, setPlayers] = useState([{ name: '', answer: 'No' }]);

  useEffect(() => {
    const quizName = window.location.search.split('=')[1];
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes.find(q => q.quizName === quizName);
    if (quiz) {
      setQuizInfo(quiz);
    }
  }, []);

  const answerQuiz = (questionIndex, answer) => {
    const correctAnswer = quizInfo.questions[questionIndex].answer;
    if (correctAnswer === answer) {
      setOverlayImage('/correct.gif'); // ここで正解のGIFをセット！
      setCorrectCount(correctCount + 1);
      // 正解時の処理
    } else {
      setOverlayImage('/incorrect.gif'); // 不正解のGIFをセット！
      // 不正解時の処理
    }
    setOverlayVisible(true);
    // quizInfoを更新
  };

  const resetQuiz = () => {
    // リセット処理
  };

  if (!quizInfo) {
    return null;
  }

  return (
    <div>
      <Overlay isVisible={overlayVisible} imageSrc={overlayImage} />
      {/* {quizInfo.questions.map((q, index) => (
        <QuizCard key={index} question={q} onAnswer={(answer) => answerQuiz(index, answer)} />
      ))} */}
      <div>正答数: {correctCount}</div>
      <button onClick={resetQuiz} className="reset-quiz-button">リセット</button>

      // プレイヤーの追加ボタンを作成しよう
<button onClick={() => setPlayers([...players, { name: '', answer: 'No' }])}>プレイヤー追加</button>

// 各プレイヤーの名前入力と回答ボタンを作成しよう
{players.map((player, i) => (
  <div key={i}>
    <input 
      type="text" 
      value={player.name} 
      onChange={e => {
        const newPlayers = [...players];
        newPlayers[i].name = e.target.value;
        setPlayers(newPlayers);
      }} 
    />
    <button 
      onMouseDown={() => {
        // 仮フセンを表示するためのロジックをここに追加
      }} 
      onMouseUp={() => {
        // 仮フセンを非表示にするためのロジックをここに追加
      }} 
      onClick={() => {
        // プレイヤーの回答処理を行うためのロジックをここに追加
        const newPlayers = [...players];
        newPlayers[i].answer = 'Yes'; // ここは実際の回答に応じて変更する
        setPlayers(newPlayers);
      }}
    >
      回答
    </button>
  </div>
))}
    </div>
  );
};

export default QuizAnswerPage;
