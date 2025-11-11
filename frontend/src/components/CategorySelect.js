import React from 'react';
import '../styles/components.css';

function CategorySelect({ onStartQuiz }) {
    const categories = ['Science', 'History', 'Technology', 'Sports', 'Movies'];

    return (
        <div className="category-container">
            <h1>Trivia Game</h1>
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
