// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import { connectRedis } from './src/config/redis.js';
import cors from 'cors';
import urlRoutes from './src/routes/urlRoutes.js';  // Correct import

dotenv.config();

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Connect to the database and Redis
connectDB();
connectRedis();

// Use the URL routes with a prefix like '/api'
app.use("/api", urlRoutes);  // The short URL is expected to be '/api/TBQB9x'

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Advanced URL Shortener API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
