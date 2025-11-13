const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// POST /api/scores - Save quiz results
router.post('/', async (req, res) => {
  try {
    const { category, score, total_questions, player_name } = req.body;
    
    if (!category || score === undefined || !total_questions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const result = await db.query(
      `INSERT INTO scores (category, score, total_questions, player_name)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [category, score, total_questions, player_name || 'Anonymous']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saving score:', err);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// GET /api/scores/top - Get top scores
router.get('/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await db.query(
      `SELECT id, category, score, total_questions, player_name, created_at
       FROM scores
       ORDER BY score DESC, created_at DESC
       LIMIT $1`,
      [limit]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching top scores:', err);
    res.status(500).json({ error: 'Failed to fetch top scores' });
  }
});

module.exports = router;
