import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const createConversation = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    console.log("User ID from header:", userId);
    const conversation = await Conversation.create({ userId:userId });
    return res.status(201).json(conversation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    console.log("User ID from header:", userId);
    const conversations = await Conversation.find({ userId:userId }).sort({ updatedAt: -1 });
    return res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const {id,title} = req.body

    const conversations = await Conversation.findByIdAndUpdate(id, { title }, { new: true });
    return res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json({ updateConversation: error.message });
  }
};


export const saveMessages = async (req, res) => {
  try {
    const { conversationId, role, message } = req.body; 
    const savedMessage = await Message.create({ conversationId, role, message }).sort({ createdAt: -1 });
   return  res.status(201).json(savedMessage);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId }).sort({ createdAt: -1 });
   return  res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};