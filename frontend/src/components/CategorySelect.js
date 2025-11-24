import React, { useState, useEffect } from "react";
import "../Styles/Components.css";

function CategorySelect({ onStartQuiz, setName }) {
  const [inputName, setInputName] = useState("");
  const [leaderboard, setLeaderboard] = useState(null);
  const categories = ["Science", "History", "Technology", "Sports", "Movies"];

  useEffect(() => {
    if (!inputName) return;

    fetch(`http://localhost:5001/api/leaderboard/${inputName}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setLeaderboard(data);
        } else {
          setLeaderboard(null);
        }
      })
      .catch(() => setLeaderboard(null));
  }, [inputName]);

  const handleEnter = async () => {
    await fetch("http://localhost:5001/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: inputName }),
    });

    setName(inputName);
  };

  const leaderboardList =
    leaderboard && leaderboard.scores ? (
      Object.entries(leaderboard.scores).map(([category, score]) => (
        <div key={category}>
          {category}: {score}
        </div>
      ))
    ) : (
      <p>No scores yet.</p>
    );

  return (
    <div className="category-container">
      <h1>Trivia Game</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />

      <button disabled={!inputName} onClick={handleEnter}>
        Enter
      </button>

      <h2>Leaderboard</h2>
      {leaderboardList}

      <button
        disabled={!inputName}
        onClick={() => onStartQuiz(inputName)}
        className="start-btn"
      >
        Start Quiz
      </button>

      <p>Select a category to start:</p>

      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className="category-btn"
            onClick={() => onStartQuiz(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelect;
