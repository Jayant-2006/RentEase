const mongoose = require('mongoose');
// Removed bcrypt import

/**
 * User Schema for RentEase
 * Stores user information including lifestyle preferences
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
    },
    occupation: {
      type: String,
      trim: true,
    },
    habits: {
      smoker: {
        type: Boolean,
        default: false,
      },
      petLover: {
        type: Boolean,
        default: false,
      },
      nightOwl: {
        type: Boolean,
        default: false,
      },
      cleanliness: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
      },
    },
    location: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    profileImage: {
      type: String,
      default: 'default-avatar.png',
    },
  },
  {
    timestamps: true,
  }
);

// Removed password hashing pre-save middleware

// Removed password comparison method
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);