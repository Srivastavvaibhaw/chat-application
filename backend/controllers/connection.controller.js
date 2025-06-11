// backend/controllers/connection.controller.js
import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

// Get user's connection code
export const getConnectionCode = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.status(200).json({ connectionCode: user.connectionCode });
  } catch (error) {
    console.error("Error in getConnectionCode:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send connection request
export const sendConnectionRequest = async (req, res) => {
  try {
    const { connectionCode } = req.body;
    const senderId = req.user._id;
    
    // Find user by connection code
    const recipient = await User.findOne({ connectionCode });
    if (!recipient) {
      return res.status(404).json({ error: "User with this connection code not found" });
    }
    
    // Prevent connecting to yourself
    if (recipient._id.toString() === senderId.toString()) {
      return res.status(400).json({ error: "You cannot connect with yourself" });
    }
    
    // Check if sender is blocked by recipient
    if (recipient.blockedUsers.includes(senderId)) {
      return res.status(403).json({ error: "You cannot connect with this user" });
    }
    
    // Check if conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: { $all: [senderId, recipient._id] }
    });
    
    if (existingConversation) {
      if (existingConversation.status === "accepted") {
        return res.status(400).json({ error: "You are already connected with this user" });
      } else {
        return res.status(400).json({ error: "Connection request already sent" });
      }
    }
    
    // Add to pending connections
    await User.findByIdAndUpdate(recipient._id, {
      $addToSet: { pendingConnections: senderId }
    });
    
    // Create new pending conversation
    const newConversation = new Conversation({
      participants: [senderId, recipient._id],
      status: "pending"
    });
    
    await newConversation.save();
    
    res.status(201).json({ message: "Connection request sent successfully" });
  } catch (error) {
    console.error("Error in sendConnectionRequest:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Accept connection request
export const acceptConnectionRequest = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user._id;
    
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    
    // Check if user is participant
    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    // Check if already accepted
    if (conversation.status === "accepted") {
      return res.status(400).json({ error: "Connection already accepted" });
    }
    
    // Update conversation status
    conversation.status = "accepted";
    await conversation.save();
    
    // Find the sender (other participant)
    const senderId = conversation.participants.find(
      id => id.toString() !== userId.toString()
    );
    
    // Remove from pending connections
    await User.findByIdAndUpdate(userId, {
      $pull: { pendingConnections: senderId }
    });
    
    res.status(200).json({ message: "Connection request accepted" });
  } catch (error) {
    console.error("Error in acceptConnectionRequest:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reject connection request
export const rejectConnectionRequest = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user._id;
    
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    
    // Check if user is participant
    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    // Find the sender (other participant)
    const senderId = conversation.participants.find(
      id => id.toString() !== userId.toString()
    );
    
    // Remove from pending connections
    await User.findByIdAndUpdate(userId, {
      $pull: { pendingConnections: senderId }
    });
    
    // Delete the conversation
    await Conversation.findByIdAndDelete(conversationId);
    
    res.status(200).json({ message: "Connection request rejected" });
  } catch (error) {
    console.error("Error in rejectConnectionRequest:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Block user
export const blockUser = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user._id;
    
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    
    // Check if user is participant
    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    // Find the other user
    const otherUserId = conversation.participants.find(
      id => id.toString() !== userId.toString()
    );
    
    // Add to blocked users
    await User.findByIdAndUpdate(userId, {
      $addToSet: { blockedUsers: otherUserId }
    });
    
    // Update conversation
    conversation.isBlocked = true;
    conversation.blockedBy = userId;
    await conversation.save();
    
    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("Error in blockUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Unblock user
export const unblockUser = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user._id;
    
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    
    // Check if user is participant
    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    // Check if user is the one who blocked
    if (conversation.blockedBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: "You did not block this conversation" });
    }
    
    // Find the other user
    const otherUserId = conversation.participants.find(
      id => id.toString() !== userId.toString()
    );
    
    // Remove from blocked users
    await User.findByIdAndUpdate(userId, {
      $pull: { blockedUsers: otherUserId }
    });
    
    // Update conversation
    conversation.isBlocked = false;
    conversation.blockedBy = null;
    await conversation.save();
    
    res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    console.error("Error in unblockUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get pending connection requests
export const getPendingRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId).populate({
      path: "pendingConnections",
      select: "fullName username profilePic"
    });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Get conversations for these pending requests
    const pendingConversations = await Conversation.find({
      participants: userId,
      status: "pending"
    });
    
    // Combine user info with conversation IDs
    const pendingRequestsWithConversationIds = user.pendingConnections.map(requester => {
      const conversation = pendingConversations.find(conv => 
        conv.participants.some(p => p.toString() === requester._id.toString())
      );
      
      return {
        _id: requester._id,
        fullName: requester.fullName,
        username: requester.username,
        profilePic: requester.profilePic,
        conversationId: conversation?._id
      };
    });
    
    res.status(200).json(pendingRequestsWithConversationIds);
  } catch (error) {
    console.error("Error in getPendingRequests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add this to your connection.controller.js file

// Get all connections with status info
export const getConnectionsStatus = async (req, res) => {
    try {
      const userId = req.user._id;
      
      // Find all conversations where the user is a participant
      const conversations = await Conversation.find({
        participants: userId
      });
      
      // Format the data to include status and other info
      const connectionStatuses = conversations.map(conversation => {
        // Find the other participant's ID
        const participantId = conversation.participants.find(
          id => id.toString() !== userId.toString()
        );
        
        return {
          conversationId: conversation._id,
          participantId,
          status: conversation.status,
          isBlocked: conversation.isBlocked,
          blockedBy: conversation.blockedBy,
          initiatedByMe: conversation.participants[0].toString() === userId.toString()
        };
      });
      
      res.status(200).json(connectionStatuses);
    } catch (error) {
      console.error("Error in getConnectionsStatus:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  