const express = require('express');
const router = express.Router();
const {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getMyListings,
} = require('../controllers/listingController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getListings);
router.get('/:id', getListingById);

// Protected routes
router.post('/', protect, createListing);
router.get('/my/listings', protect, getMyListings);
router.route('/:id').put(protect, updateListing).delete(protect, deleteListing);

module.exports = router;
