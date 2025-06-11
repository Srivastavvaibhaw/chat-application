// backend/models/conversation.model.js
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  // Add status field for pending/accepted connections
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending"
  },
  // Add blocked status
  isBlocked: {
    type: Boolean,
    default: false
  },
  // Add who blocked the conversation
  blockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
