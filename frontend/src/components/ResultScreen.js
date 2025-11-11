import React from 'react';
import '../styles/components.css';

function ResultsScreen({ score, totalQuestions, category, onPlayAgain }) {
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div className="results-container">
            <h1>Quiz Complete!</h1>
            <div className="results-card">
                <h2>Category: {category}</h2>
                <h3>Your Score: {score}/{totalQuestions}</h3>
                <h3>Percentage: {percentage}%</h3>
                <button className="play-again-btn" onClick={onPlayAgain}>
                    Play Again
                </button>
            </div>
        </div>
    );
}

export default ResultsScreen;
