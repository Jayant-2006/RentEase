# 🚀 Quick Start Guide - RentEase

Follow these steps to get RentEase up and running on your machine.

## Prerequisites Check
- [ ] Node.js installed (v14+) - Check: `node --version`
- [ ] npm installed - Check: `npm --version`
- [ ] MongoDB installed or MongoDB Atlas account

## Setup Steps (5 minutes)

### 1️⃣ Install All Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Return to root
cd ..
```

### 2️⃣ Start MongoDB
**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - MongoDB Atlas:**
- Copy your connection string
- Update `server/.env` with your connection string

### 3️⃣ Verify Server Configuration
Check that `server/.env` exists with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rentease
JWT_SECRET=rentease_super_secret_jwt_key_2024_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### 4️⃣ Start the Application
```bash
# From root directory
npm run dev
```

This will start:
- ✅ Backend server on http://localhost:5000
- ✅ Frontend app on http://localhost:5173

### 5️⃣ Access the Application
Open your browser and go to: **http://localhost:5173**

## First Time Usage

### Create Your First Account
1. Click "Sign Up" in the navigation
2. Fill in your details and lifestyle preferences
3. Click "Sign Up" to create your account
4. You'll be automatically logged in!

### Post Your First Listing
1. After logging in, click "Post Listing"
2. Fill in property details
3. Submit to create your listing

### Test Matching
1. Create 2-3 accounts with different preferences
2. Login as different users
3. Go to "Match" page to see compatibility scores

## Troubleshooting

### Port Already in Use?
```bash
# Kill the process
npx kill-port 5000
npx kill-port 5173
```

### MongoDB Not Connected?
- Check if MongoDB is running: `mongo --version`
- Start MongoDB: `mongod` or `brew services start mongodb-community`

### Still Having Issues?
1. Delete `node_modules` in all folders
2. Run `npm install` again in root, server, and client
3. Restart the application

## Test Credentials (After Creating)
You can create test users with these profiles:

**User 1 - Clean Early Bird:**
- Email: alice@test.com
- Cleanliness: 5/5, No smoking, No pets, Early bird

**User 2 - Casual Night Owl:**
- Email: bob@test.com
- Cleanliness: 3/5, No smoking, Loves pets, Night owl

These will show different compatibility scores!

## What to Try First

1. ✅ Register a new account
2. ✅ Complete your profile with lifestyle preferences
3. ✅ Browse existing listings
4. ✅ Post a new listing
5. ✅ Check the Match page for compatible roommates
6. ✅ Send a message via Chat
7. ✅ Book a property visit

## Development Commands

```bash
# Start both servers (recommended)
npm run dev

# Start only backend
cd server && npm run dev

# Start only frontend
cd client && npm run dev

# Build frontend for production
cd client && npm run build
```

## Need Help?

- 📖 See full documentation in `README.md`
- 🐛 Check Troubleshooting section
- 💬 Review API endpoints in README

---

**You're all set! Happy house hunting! 🏠**
