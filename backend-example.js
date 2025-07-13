// Example backend API for ReadIt Web Clipper
// This should run on your server, NOT in the Chrome extension

// Load environment variables (only in development)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());

// NeonDB connection (server-side only) - now using environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: process.env.SSL_REJECT_UNAUTHORIZED === 'true'
  }
});

// API endpoint for saving clips
app.post('/api/clips', async (req, res) => {
  try {
    const { text, url, title, timestamp } = req.body;
    
    // Validate required fields
    if (!text || !url) {
      return res.status(400).json({ error: 'Text and URL are required' });
    }
    
    // Insert into database
    const query = `
      INSERT INTO clips (text, url, title, timestamp, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id
    `;
    
    const result = await pool.query(query, [text, url, title, timestamp]);
    
    res.json({
      success: true,
      id: result.rows[0].id,
      message: 'Clip saved successfully'
    });
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to save clip' });
  }
});

// Get all clips
app.get('/api/clips', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clips ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch clips' });
  }
});

// Database setup (run once)
app.post('/api/setup', async (req, res) => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS clips (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        url TEXT NOT NULL,
        title TEXT,
        timestamp TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    await pool.query(createTableQuery);
    res.json({ message: 'Database setup complete' });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ error: 'Failed to setup database' });
  }
});

app.listen(port, () => {
  console.log(`ReadIt API server running on port ${port}`);
});

// Example usage:
// 1. Deploy this to a server (Heroku, Vercel, etc.)
// 2. Update your extension's API_ENDPOINT to point to this server
// 3. Call POST /api/setup once to create the table 