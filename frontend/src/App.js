import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategorySelect from './components/CategorySelect';
import QuestionDisplay from './components/QuestionDisplay';
import ResultsScreen from './components/ResultsScreen';
import 'App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'results'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [apiUrl] = useState('http://localhost:5000'); // Change for deployed backend

  // Start a new quiz session
  const startQuiz = async (category) => {
    try {
      const response = await axios.post(`${apiUrl}/api/quiz/start`, {
        category: category
      });
      setSessionId(response.data.session_id);
      setSelectedCategory(category);
      setGameState('playing');
      setScore(0);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Failed to start quiz. Make sure the backend is running.');
    }
  };

  // Handle answer submission
  const handleAnswerSubmit = async (answer) => {
    try {
      const response = await axios.post(`${apiUrl}/api/quiz/submit-answer`, {
        session_id: sessionId,
        answer: answer,
        question_index: currentQuestionIndex
      });

      if (response.data.is_correct) {
        setScore(score + 1);
      }

      setUserAnswers([...userAnswers, answer]);

      // Check if quiz is complete
      if (currentQuestionIndex + 1 >= 10) { // Assuming 10 questions per quiz
        setGameState('results');
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Error submitting answer');
    }
  };

  // Reset to menu
  const resetGame = () => {
    setGameState('menu');
    setSelectedCategory(null);
    setSessionId(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  return (
    <div className="App">
      {gameState === 'menu' && <CategorySelect onStartQuiz={startQuiz} />}
      {gameState === 'playing' && (
        <QuestionDisplay
          sessionId={sessionId}
          questionIndex={currentQuestionIndex}
          score={score}
          onAnswerSubmit={handleAnswerSubmit}
          apiUrl={apiUrl}
        />
      )}
      {gameState === 'results' && (
        <ResultsScreen
          score={score}
          totalQuestions={10}
          category={selectedCategory}
          onPlayAgain={resetGame}
        />
      )}
    </div>
  );
}

export default App;
