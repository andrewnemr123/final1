import React, { useState } from "react";
import CategorySelect from "./components/CategorySelect";
import QuestionDisplay from "./components/QuestionDisplay";
import ResultsScreen from "./components/ResultScreen";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState("menu");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  // Fetch questions from backend API
  const startQuiz = async (category) => {
    setLoading(true);
    setError(null);

    try {
      // Use port 5001 to match your docker-compose setup
      const response = await fetch(
        `http://localhost:5001/api/questions/${category}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setSelectedCategory(category);
        setGameState("playing");
        setScore(0);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
      } else {
        throw new Error("No questions received from API");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(`Failed to load questions: ${err.message}`);
      alert(`Failed to load questions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle answer submission
  const handleAnswerSubmit = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect: isCorrect,
      },
    ]);

    // Check if quiz is complete
    if (currentQuestionIndex + 1 >= questions.length) {
      setGameState("results");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Reset to menu
  const resetGame = () => {
    setGameState("menu");
    setSelectedCategory(null);
    setQuestions([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧠 Trivia Quiz</h1>
      </header>

      <main>
        {gameState === "menu" && (
          <>
            <CategorySelect
              onStartQuiz={startQuiz}
              name={name}
              setName={setName}
            />
            {loading && <div className="loading">Loading questions...</div>}
            {error && <div className="error">{error}</div>}
          </>
        )}

        {gameState === "playing" && questions.length > 0 && (
          <QuestionDisplay
            question={questions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            score={score}
            onAnswerSubmit={handleAnswerSubmit}
          />
        )}

        {gameState === "results" && (
          <ResultsScreen
            score={score}
            totalQuestions={questions.length}
            category={selectedCategory}
            userAnswers={userAnswers}
            name={name}
            onPlayAgain={resetGame}
          />
        )}
      </main>
    </div>
  );
}

export default App;
