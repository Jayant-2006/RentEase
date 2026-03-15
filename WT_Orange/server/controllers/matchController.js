const User = require('../models/User');
const Listing = require('../models/Listing');

/**
 * Calculate compatibility score between two users based on lifestyle preferences
 * @param {Object} user1 - First user's habits
 * @param {Object} user2 - Second user's habits
 * @returns {Number} Compatibility percentage (0-100)
 */
const calculateCompatibility = (user1Habits, user2Habits) => {
  let score = 0;
  let totalFactors = 0;

  // Smoker compatibility (30% weight)
  if (user1Habits.smoker === user2Habits.smoker) {
    score += 30;
  }
  totalFactors += 30;

  // Pet lover compatibility (20% weight)
  if (user1Habits.petLover === user2Habits.petLover) {
    score += 20;
  }
  totalFactors += 20;

  // Night owl compatibility (20% weight)
  if (user1Habits.nightOwl === user2Habits.nightOwl) {
    score += 20;
  }
  totalFactors += 20;

  // Cleanliness compatibility (30% weight)
  // The closer the cleanliness ratings, the better
  const cleanlinessDiff = Math.abs(user1Habits.cleanliness - user2Habits.cleanliness);
  const cleanlinessScore = Math.max(0, 30 - (cleanlinessDiff * 7.5));
  score += cleanlinessScore;
  totalFactors += 30;

  return Math.round((score / totalFactors) * 100);
};

/**
 * @desc    Get matched roommates based on current user's preferences
 * @route   GET /api/match/roommates
 * @access  Private
 */
const getMatchedRoommates = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all users except current user
    const allUsers = await User.find({ _id: { $ne: req.user._id } });

    // Calculate compatibility scores
    const matchedUsers = allUsers.map((user) => {
      const compatibilityScore = calculateCompatibility(
        currentUser.habits,
        user.habits
      );

      return {
        _id: user._id,
        name: user.name,
        age: user.age,
        gender: user.gender,
        occupation: user.occupation,
        location: user.location,
        bio: user.bio,
        habits: user.habits,
        profileImage: user.profileImage,
        compatibilityScore,
      };
    });

    // Sort by compatibility score (highest first)
    matchedUsers.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    // Optional: Filter by minimum compatibility threshold
    const minCompatibility = req.query.minScore || 50;
    const filteredMatches = matchedUsers.filter(
      (user) => user.compatibilityScore >= minCompatibility
    );

    res.json(filteredMatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get matched listings based on user preferences
 * @route   GET /api/match/listings
 * @access  Private
 */
const getMatchedListings = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all available listings
    const listings = await Listing.find({ status: 'Available' }).populate(
      'postedBy',
      'name habits location'
    );

    // Calculate compatibility with listing owner
    const matchedListings = listings.map((listing) => {
      const compatibilityScore = calculateCompatibility(
        currentUser.habits,
        listing.postedBy.habits
      );

      return {
        ...listing.toObject(),
        compatibilityScore,
      };
    });

    // Sort by compatibility score
    matchedListings.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    // Optional: Filter by location match
    if (currentUser.location && req.query.matchLocation === 'true') {
      const locationMatched = matchedListings.filter(
        (listing) =>
          listing.location.toLowerCase().includes(currentUser.location.toLowerCase()) ||
          currentUser.location.toLowerCase().includes(listing.location.toLowerCase())
      );
      return res.json(locationMatched);
    }

    res.json(matchedListings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get compatibility score with specific user
 * @route   GET /api/match/compatibility/:userId
 * @access  Private
 */
const getCompatibilityWithUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(req.params.userId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const compatibilityScore = calculateCompatibility(
      currentUser.habits,
      targetUser.habits
    );

    res.json({
      user: {
        _id: targetUser._id,
        name: targetUser.name,
        location: targetUser.location,
      },
      compatibilityScore,
      breakdown: {
        smoker: currentUser.habits.smoker === targetUser.habits.smoker,
        petLover: currentUser.habits.petLover === targetUser.habits.petLover,
        nightOwl: currentUser.habits.nightOwl === targetUser.habits.nightOwl,
        cleanlinessDifference: Math.abs(
          currentUser.habits.cleanliness - targetUser.habits.cleanliness
        ),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMatchedRoommates,
  getMatchedListings,
  getCompatibilityWithUser,
};
