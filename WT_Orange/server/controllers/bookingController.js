const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

/**
 * @desc    Create a new booking request
 * @route   POST /api/bookings
 * @access  Private
 */
const createBooking = async (req, res) => {
  try {
    const { listingId, date, timeSlot, message } = req.body;

    // Verify listing exists
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user is trying to book their own listing
    if (listing.postedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot book your own listing' });
    }

    const booking = await Booking.create({
      listingId,
      userId: req.user._id,
      date,
      timeSlot,
      message,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('listingId', 'title location rent')
      .populate('userId', 'name email');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all bookings for logged-in user
 * @route   GET /api/bookings
 * @access  Private
 */
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('listingId', 'title location rent images')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get bookings received for user's listings
 * @route   GET /api/bookings/received
 * @access  Private
 */
const getReceivedBookings = async (req, res) => {
  try {
    // Find all listings posted by the user
    const userListings = await Listing.find({ postedBy: req.user._id });
    const listingIds = userListings.map((listing) => listing._id);

    // Find all bookings for those listings
    const bookings = await Booking.find({ listingId: { $in: listingIds } })
      .populate('listingId', 'title location rent images')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update booking status
 * @route   PUT /api/bookings/:id
 * @access  Private
 */
const updateBooking = async (req, res) => {
  try {
    const { status, response } = req.body;
    const booking = await Booking.findById(req.params.id).populate('listingId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is the listing owner (to confirm/cancel) or booking owner (to cancel)
    const isListingOwner = booking.listingId.postedBy.toString() === req.user._id.toString();
    const isBookingOwner = booking.userId.toString() === req.user._id.toString();

    if (!isListingOwner && !isBookingOwner) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // Update booking
    if (status) booking.status = status;
    if (response) booking.response = response;

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('listingId', 'title location rent')
      .populate('userId', 'name email');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete a booking
 * @route   DELETE /api/bookings/:id
 * @access  Private
 */
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only booking owner can delete
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this booking' });
    }

    await booking.deleteOne();

    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getReceivedBookings,
  updateBooking,
  deleteBooking,
};
