import URL from '../models/URL.js';
import { nanoid } from 'nanoid';

export const createShortUrl = async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;

  // Validate the long URL
  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  let shortUrl = customAlias ? customAlias : nanoid(6);

  // Ensure that customAlias is not null or undefined
  if (shortUrl === null || shortUrl === undefined) {
    return res.status(400).json({ error: "Custom alias cannot be null or undefined" });
  }

  // Check if the custom alias already exists
  if (await URL.findOne({ customAlias: shortUrl })) {
    return res.status(400).json({ error: "Alias already taken" });
  }

  // Create new URL record in the database
  const newUrl = await URL.create({
    longUrl,
    shortUrl,
    topic,
    createdBy: req.user?.id,
  });

  // Send back the shortened URL as a JSON response
  res.json({ shortUrl: `http://localhost:5000/${shortUrl}` });
};
