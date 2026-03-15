const Chat = require('../models/Chat');

/**
 * @desc    Get all chats for logged-in user
 * @route   GET /api/chat
 * @access  Private
 */
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id,
    })
      .populate('participants', 'name email profileImage')
      .sort({ lastMessage: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get or create chat between two users
 * @route   POST /api/chat
 * @access  Private
 */
const createOrGetChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, userId] },
    }).populate('participants', 'name email profileImage');

    if (chat) {
      return res.json(chat);
    }

    // Create new chat
    chat = await Chat.create({
      participants: [req.user._id, userId],
      messages: [],
    });

    chat = await Chat.findById(chat._id).populate(
      'participants',
      'name email profileImage'
    );

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get messages from a specific chat
 * @route   GET /api/chat/:chatId/messages
 * @access  Private
 */
const getMessages = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId).populate(
      'messages.senderId',
      'name profileImage'
    );

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Verify user is participant
    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to view this chat' });
    }

    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Send a message in a chat (HTTP endpoint, Socket.io handles real-time)
 * @route   POST /api/chat/:chatId/messages
 * @access  Private
 */
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { chatId } = req.params;

    if (!message) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Verify user is participant
    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to send messages in this chat' });
    }

    // Add message
    const newMessage = {
      senderId: req.user._id,
      message,
      timestamp: new Date(),
    };

    chat.messages.push(newMessage);
    chat.lastMessage = new Date();

    await chat.save();

    const populatedChat = await Chat.findById(chatId)
      .populate('messages.senderId', 'name profileImage')
      .populate('participants', 'name email profileImage');

    res.status(201).json(populatedChat.messages[populatedChat.messages.length - 1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete a chat
 * @route   DELETE /api/chat/:chatId
 * @access  Private
 */
const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Verify user is participant
    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to delete this chat' });
    }

    await chat.deleteOne();

    res.json({ message: 'Chat deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChats,
  createOrGetChat,
  getMessages,
  sendMessage,
  deleteChat,
};
