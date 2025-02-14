// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const client = new MongoClient(process.env.MONGO_URI);

let dbStatus = 'Not Connected';

async function connectDB() {
  try {
    await client.connect();
    dbStatus = 'Connected to MongoDB';
    console.log('✅ Database connected successfully');
  } catch (error) {
    dbStatus = 'Failed to connect to MongoDB';
    console.error('❌ Database connection failed:', error.message);
  }
}
connectDB();

// Home route to show database connection status
app.get('/', (req, res) => {
  res.json({ status: dbStatus });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
