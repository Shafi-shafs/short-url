// src/routes/urlRoutes.js
import express from 'express';
import { createShortUrl, redirectShortUrl } from '../controllers/urlController.js';

const router = express.Router();

// Route to create a shortened URL
router.post("/shorten", createShortUrl);

// Route to handle the redirection based on short URL alias
router.get("/:alias", redirectShortUrl);  // This route should match any alias

export default router;
