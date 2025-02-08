import mongoose from 'mongoose';
const URLSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  customAlias: { type: String, unique: true },
  topic: String,
  createdBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
});

const URL = mongoose.model("URL", URLSchema);

export default URL;
