const Listing = require('../models/Listing');

/**
 * @desc    Get all listings with optional filters
 * @route   GET /api/listings
 * @access  Public
 */
const getListings = async (req, res) => {
  try {
    const { location, minRent, maxRent, propertyType, status } = req.query;

    // Build query object
    let query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minRent || maxRent) {
      query.rent = {};
      if (minRent) query.rent.$gte = Number(minRent);
      if (maxRent) query.rent.$lte = Number(maxRent);
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (status) {
      query.status = status;
    } else {
      query.status = 'Available'; // Default to available listings
    }

    const listings = await Listing.find(query)
      .populate('postedBy', 'name email location habits')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single listing by ID
 * @route   GET /api/listings/:id
 * @access  Public
 */
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      'postedBy',
      'name email location habits bio'
    );

    if (listing) {
      res.json(listing);
    } else {
      res.status(404).json({ message: 'Listing not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create new listing
 * @route   POST /api/listings
 * @access  Private
 */
const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      rent,
      location,
      amenities,
      availableFrom,
      images,
      propertyType,
      bedrooms,
      bathrooms,
    } = req.body;

    const listing = await Listing.create({
      title,
      description,
      rent,
      location,
      amenities,
      availableFrom,
      images,
      propertyType,
      bedrooms,
      bathrooms,
      postedBy: req.user._id,
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update listing
 * @route   PUT /api/listings/:id
 * @access  Private
 */
const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user is the owner
    if (listing.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this listing' });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete listing
 * @route   DELETE /api/listings/:id
 * @access  Private
 */
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user is the owner
    if (listing.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this listing' });
    }

    await listing.deleteOne();

    res.json({ message: 'Listing removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get listings by logged-in user
 * @route   GET /api/listings/my-listings
 * @access  Private
 */
const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ postedBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getMyListings,
};
