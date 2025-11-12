import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import '../Styles/Components.css';

function QuestionDisplay({ question, questionIndex, totalQuestions, score, onAnswerSubmit }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [answered, setAnswered] = useState(false);

    // Reset state when question changes
    useEffect(() => {
        setTimeLeft(30);
        setAnswered(false);
        setSelectedAnswer(null);
    }, [questionIndex]);

    // Auto-submit when time runs out
    useEffect(() => {
        if (timeLeft === 0 && !answered) {
            handleSubmit(null);
        }
    }, [timeLeft, answered]);

    const handleSubmit = (answer) => {
        setAnswered(true);
        setTimeout(() => {
            onAnswerSubmit(answer);
        }, 1000); // Show feedback for 1 second before moving to next
    };

    if (!question) return <div className="loading">Loading question...</div>;

    return (
        <div className="question-container">
            <div className="score-bar">
                <h3>Score: {score}</h3>
                <h3>Question {questionIndex + 1}/{totalQuestions}</h3>
                <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
            </div>

            <div className="question-card">
                <h2>{question.question}</h2>
                <div className="options">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-btn ${selectedAnswer === option ? 'selected' : ''}`}
                            onClick={() => setSelectedAnswer(option)}
                            disabled={answered}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button
                    className="submit-btn"
                    onClick={() => handleSubmit(selectedAnswer)}
                    disabled={answered || !selectedAnswer}
                >
                    {answered ? 'Next Question...' : 'Submit Answer'}
                </button>
            </div>
        </div>
    );
}

export default QuestionDisplay;
