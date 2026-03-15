const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getReceivedBookings,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

// All booking routes are protected
router.route('/').get(protect, getUserBookings).post(protect, createBooking);

router.get('/received', protect, getReceivedBookings);

router.route('/:id').put(protect, updateBooking).delete(protect, deleteBooking);

module.exports = router;
