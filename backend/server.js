const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { waitForDatabase } = require('./db/connection');
const categoriesRouter = require('./routes/categories');
const questionsRouter = require('./routes/questions');
const scoresRouter = require('./routes/scores');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Routes
app.use('/api/categories', categoriesRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/scores', scoresRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server with database connection check
const startServer = async () => {
  try {
    console.log('Waiting for database connection...');
    await waitForDatabase();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
