const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add retry logic for Docker environment
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Helper function to wait for database to be ready
const waitForDatabase = async (maxRetries = 30, delay = 2000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const client = await pool.connect();
      console.log('Database connection established successfully');
      client.release();
      return true;
    } catch (err) {
      console.log(`Database connection attempt ${i + 1}/${maxRetries} failed. Retrying...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Could not connect to database after multiple attempts');
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  waitForDatabase
};
