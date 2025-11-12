import React, { useState } from 'react';
import CategorySelect from './components/CategorySelect';
import QuestionDisplay from './components/QuestionDisplay';
import ResultsScreen from './components/ResultScreen';
import { mockQuestions } from './mockData';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'results'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Start a new quiz session with mock data
  const startQuiz = (category) => {
    const categoryQuestions = mockQuestions[category];

    if (!categoryQuestions) {
      alert(`No questions available for ${category}`);
      return;
    }

    setQuestions(categoryQuestions);
    setSelectedCategory(category);
    setGameState('playing');
    setScore(0);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  // Handle answer submission
  const handleAnswerSubmit = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, {
      question: currentQuestion.question,
      userAnswer: answer,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect: isCorrect
    }]);

    // Check if quiz is complete
    if (currentQuestionIndex + 1 >= questions.length) {
      setGameState('results');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Reset to menu
  const resetGame = () => {
    setGameState('menu');
    setSelectedCategory(null);
    setQuestions([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  return (
    <div className="App">
      {gameState === 'menu' && <CategorySelect onStartQuiz={startQuiz} />}
      {gameState === 'playing' && (
        <QuestionDisplay
          question={questions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          score={score}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}
      {gameState === 'results' && (
        <ResultsScreen
          score={score}
          totalQuestions={questions.length}
          category={selectedCategory}
          userAnswers={userAnswers}
          onPlayAgain={resetGame}
        />
      )}
    </div>
  );
}

export default App;
