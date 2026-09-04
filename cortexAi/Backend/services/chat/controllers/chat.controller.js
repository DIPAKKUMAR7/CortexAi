import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    console.log("User ID from header:", userId);

    if (!userId) {
      return res.status(400).json({ message: "x-user-id header is required" });
    }

    const conversation = await Conversation.create({ userId });
    return res.status(201).json(conversation);
  } catch (error) {
    console.error("Error in createConversation:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    console.log("User ID from header:", userId);

    if (!userId) {
      return res.status(400).json({ message: "x-user-id header is required" });
    }

    const conversations = await Conversation.find({ userId }).sort({ updatedAt: -1 });
    return res.status(200).json(conversations);
  } catch (error) {
    console.error("Error in getConversations:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { id, title } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Conversation ID is required" });
    }

    const conversation = await Conversation.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error("Error in updateConversation:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const saveMessages = async (req, res) => {
  try {
    const { conversationId, role, message } = req.body;

    if (!conversationId || !role || !message) {
      return res.status(400).json({ message: "Missing required message fields" });
    }

    // FIXED: Removed .sort() from .create()
    const savedMessage = await Message.create({ conversationId, role, message });
    return res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error in saveMessages:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({ message: "conversationId parameter is required" });
    }

    const messages = await Message.find({ conversationId }).sort({ createdAt: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    return res.status(500).json({ message: error.message });
  }
};