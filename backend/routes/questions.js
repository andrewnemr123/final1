const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /api/questions/:category - Get all questions for a specific category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const result = await db.query(
      `SELECT q.id, q.question, q.options, q.correct_answer 
       FROM questions q
       JOIN categories c ON q.category_id = c.id
       WHERE c.name = $1
       ORDER BY q.id`,
      [category]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found or no questions available' });
    }
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// GET /api/questions/:category/random - Get random questions from a category
router.get('/:category/random', async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await db.query(
      `SELECT q.id, q.question, q.options, q.correct_answer 
       FROM questions q
       JOIN categories c ON q.category_id = c.id
       WHERE c.name = $1
       ORDER BY RANDOM()
       LIMIT $2`,
      [category, limit]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found or no questions available' });
    }
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching random questions:', err);
    res.status(500).json({ error: 'Failed to fetch random questions' });
  }
});

module.exports = router;
