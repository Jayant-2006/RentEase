const mongoose = require('mongoose');

/**
 * Booking Schema for visit requests
 * Manages property visit schedules and requests
 */
const bookingSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide a visit date'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Please provide a time slot'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
    },
    message: {
      type: String,
      maxlength: 500,
    },
    response: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
