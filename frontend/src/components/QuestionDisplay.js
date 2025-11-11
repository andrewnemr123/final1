import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from 'Timer';
import '../styles/components.css';
import axios from 'axios';

function QuestionDisplay({ sessionId, questionIndex, score, onAnswerSubmit, apiUrl }) {
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        fetchQuestion();
    }, [questionIndex]);

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            setTimeLeft(30);
            setAnswered(false);
            setSelectedAnswer(null);

            const response = await axios.get(`${apiUrl}/api/quiz/question`, {
                params: { session_id: sessionId, index: questionIndex }
            });

            setQuestion(response.data);
        } catch (error) {
            console.error('Error fetching question:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timeLeft === 0 && !answered) {
            handleSubmit(null); // Auto-submit with no answer
        }
    }, [timeLeft]);

    const handleSubmit = (answer) => {
        setAnswered(true);
        onAnswerSubmit(answer);
    };

    if (loading) return <div className="loading">Loading question...</div>;
    if (!question) return <div className="error">Failed to load question</div>;

    return (
        <div className="question-container">
            <div className="score-bar">
                <h3>Score: {score}</h3>
                <h3>Question {questionIndex + 1}/10</h3>
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
                    disabled={answered}
                >
                    {answered ? 'Loading next question...' : 'Submit Answer'}
                </button>
            </div>
        </div>
    );
}

export default QuestionDisplay;
