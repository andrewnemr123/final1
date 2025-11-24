import React, { useState, useEffect } from "react";
import "../Styles/Components.css";

function ResultsScreen({
  score,
  totalQuestions,
  category,
  userAnswers,
  name,
  onPlayAgain,
}) {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return "Excellent! 🌟";
    if (percentage >= 70) return "Great Job! 👏";
    if (percentage >= 50) return "Good Effort! 👍";
    return "Keep Practicing! 💪";
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, score }),
    });
  }, [name, category, score]);

  return (
    <div className="results-container">
      <h1>Quiz Complete!</h1>
      <div className="results-card">
        <h2>Category: {category}</h2>
        <h3>
          Your Score: {score}/{totalQuestions}
        </h3>
        <h3>Percentage: {percentage}%</h3>
        <h2>{getGrade()}</h2>

        <div className="answer-review">
          <h4>Review Your Answers:</h4>
          {userAnswers.map((answer, index) => (
            <div
              key={index}
              className={`answer-item ${
                answer.isCorrect ? "correct" : "incorrect"
              }`}
            >
              <p>
                <strong>Q{index + 1}:</strong> {answer.question}
              </p>
              <p>Your Answer: {answer.userAnswer || "No answer"}</p>
              {!answer.isCorrect && (
                <p>Correct Answer: {answer.correctAnswer}</p>
              )}
            </div>
          ))}
        </div>

        <button className="play-again-btn" onClick={onPlayAgain}>
          Back to menu
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;
