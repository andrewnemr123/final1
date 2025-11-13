const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /api/categories - Get all available quiz categories
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name FROM categories ORDER BY name'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
