const express = require('express');
const router = express.Router();
const {
  getMatchedRoommates,
  getMatchedListings,
  getCompatibilityWithUser,
} = require('../controllers/matchController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.get('/roommates', protect, getMatchedRoommates);
router.get('/listings', protect, getMatchedListings);
router.get('/compatibility/:userId', protect, getCompatibilityWithUser);

module.exports = router;
