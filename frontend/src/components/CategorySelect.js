import React, { useState, useEffect } from 'react';
import '../Styles/Components.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function CategorySelect({ onStartQuiz }) {
    const [categories, setCategories] = useState(['Science', 'History', 'Technology', 'Sports', 'Movies']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to fetch categories from API
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/api/categories`);
                
                if (response.ok) {
                    const apiCategories = await response.json();
                    if (apiCategories && apiCategories.length > 0) {
                        setCategories(apiCategories.map(cat => cat.name));
                    }
                }
            } catch (error) {
                console.warn('API not available, using default categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="category-container">
            <h1>Trivia Game</h1>
            <p>Select a category to start:</p>
            {loading ? (
                <p>Loading categories...</p>
            ) : (
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
            )}
        </div>
    );
}

export default CategorySelect;
