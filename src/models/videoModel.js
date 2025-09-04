// models/Video.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: String,
  url: String,
  filePath: String,    // where MP3 is saved
  added: { type: Date, default: Date.now },
}, {timestamps: true});

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);
export default Video;
