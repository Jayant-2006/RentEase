const express = require('express');
const router = express.Router();
const {
  getChats,
  createOrGetChat,
  getMessages,
  sendMessage,
  deleteChat,
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

// All chat routes are protected
router.route('/').get(protect, getChats).post(protect, createOrGetChat);

router.route('/:chatId').delete(protect, deleteChat);

router
  .route('/:chatId/messages')
  .get(protect, getMessages)
  .post(protect, sendMessage);

module.exports = router;
