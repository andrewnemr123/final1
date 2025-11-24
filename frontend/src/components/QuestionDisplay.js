import React, { useState, useEffect, useCallback } from 'react';
import Timer from './Timer';
import '../Styles/Components.css';

function QuestionDisplay({ question, questionIndex, totalQuestions, score, onAnswerSubmit }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [answered, setAnswered] = useState(false);

    // Wrap handleSubmit in useCallback to fix exhaustive-deps warning
    const handleSubmit = useCallback((answer) => {
        setAnswered(true);
        setTimeout(() => {
            onAnswerSubmit(answer);
        }, 1000); // Show feedback for 1 second before moving to next
    }, [onAnswerSubmit]);

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
    }, [timeLeft, answered, handleSubmit]);

    // Check if question or answers are missing
    if (!question) {
        return <div className="loading">Loading question...</div>;
    }

    // Check if answers array exists - THIS FIXES THE ERROR
    if (!question.answers || !Array.isArray(question.answers)) {
        console.error('Question structure:', question);
        return <div className="error">Error: Invalid question data</div>;
    }

    const handleAnswerClick = (answer) => {
        if (!answered) {
            setSelectedAnswer(answer);
        }
    };

    const handleSubmitClick = () => {
        if (selectedAnswer && !answered) {
            handleSubmit(selectedAnswer);
        }
    };

    return (
        <div className="question-container">
            <div className="question-header">
                <div className="question-progress">
                    Question {questionIndex + 1} of {totalQuestions}
                </div>
                <div className="score">Score: {score}</div>
            </div>

            <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />

            <div className="question-text">
                <h2>{question.question}</h2>
            </div>

            <div className="answers-grid">
                {question.answers.map((answer, index) => (
                    <button
                        key={index}
                        className={`answer-button ${selectedAnswer === answer ? 'selected' : ''
                            } ${answered && answer === question.correct_answer
                                ? 'correct'
                                : answered && selectedAnswer === answer
                                    ? 'incorrect'
                                    : ''
                            }`}
                        onClick={() => handleAnswerClick(answer)}
                        disabled={answered}
                    >
                        {answer}
                    </button>
                ))}
            </div>

            <button
                className="submit-button"
                onClick={handleSubmitClick}
                disabled={!selectedAnswer || answered}
            >
                {answered ? 'Next Question...' : 'Submit Answer'}
            </button>

            {answered && (
                <div className={`feedback ${selectedAnswer === question.correct_answer ? 'correct' : 'incorrect'}`}>
                    {selectedAnswer === question.correct_answer
                        ? '✓ Correct!'
                        : `✗ Wrong! The correct answer is: ${question.correct_answer}`}
                </div>
            )}
        </div>
    );
}

export default QuestionDisplay;
