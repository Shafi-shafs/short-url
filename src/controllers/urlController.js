// src/controllers/urlController.js

import URL from "../models/URL.js"; // Ensure correct import
import { nanoid } from "nanoid";

// Function to create a short URL
export const createShortUrl = async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  let shortUrl = customAlias || nanoid(6);
  if (await URL.findOne({ customAlias: shortUrl })) {
    return res.status(400).json({ error: "Alias already taken" });
  }

  const newUrl = await URL.create({
    longUrl,
    shortUrl,
    topic,
    createdBy: req.user?.id,
  });

  res.json({ shortUrl: `http://localhost:5000/${shortUrl}` });
};


// Function to handle redirection based on short URL alias
export const redirectShortUrl = async (req, res) => {
  try {
    const url = await URL.findOne({ shortUrl: req.params.alias });  // Look for the alias

    if (url) {
      res.redirect(url.longUrl);  // Redirect to the original long URL
    } else {
      res.status(404).json({ error: "URL not found" });  // If alias is not found
    }
  } catch (error) {
    res.status(500).json({ error: "Server error during redirection" });
  }
};
