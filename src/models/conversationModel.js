// /models/conversationModel.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ["system", "user", "assistant"]
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const conversationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "New Conversation"
  },
  messages: [messageSchema],
  participants: [{
    type: String,
    default: "user"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  metadata: {
    model: String,
    temperature: Number,
    maxTokens: Number
  }
});

// Update the updatedAt field before saving
conversationSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Conversation || 
       mongoose.model("Conversation", conversationSchema);