const mongoose = require('mongoose');

/**
 * Listing Schema for rental properties
 * Stores information about available rooms/apartments
 */
const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: 1000,
    },
    rent: {
      type: Number,
      required: [true, 'Please provide rent amount'],
      min: 0,
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
      trim: true,
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    availableFrom: {
      type: Date,
      required: [true, 'Please provide availability date'],
    },
    images: [
      {
        type: String,
      },
    ],
    propertyType: {
      type: String,
      enum: ['Apartment', 'House', 'Room', 'Studio', 'Shared Room'],
      default: 'Room',
    },
    bedrooms: {
      type: Number,
      min: 0,
      default: 1,
    },
    bathrooms: {
      type: Number,
      min: 0,
      default: 1,
    },
    status: {
      type: String,
      enum: ['Available', 'Rented', 'Pending'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Listing', listingSchema);
