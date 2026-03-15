# RentEase – Smart Roommate & Flat Finder

RentEase is a full-stack web application that helps users find compatible roommates and rental listings based on lifestyle preferences. The platform uses a smart matching algorithm to calculate compatibility scores between potential roommates.

## 🚀 Features

### Frontend (React)
- **Responsive Design**: Built with React and Tailwind CSS
- **10 Pages**: Home, Register, Login, Listings, Listing Details, Match, Chat, Bookings, About, Contact, Profile
- **Smart Routing**: React Router for navigation
- **State Management**: Context API for global state
- **Form Validation**: Client-side validation for all forms

### Backend (Node.js + Express)
- **RESTful API**: Well-structured API endpoints
- **Authentication**: JWT-based authentication
- **Database**: MongoDB with Mongoose ODM
- **Smart Matching Algorithm**: Compatibility scoring based on lifestyle preferences

### Key Functionalities
1. **User Authentication**: Secure registration and login with JWT tokens
2. **Lifestyle Matching**: Algorithm calculates compatibility (0-100%) based on:
   - Smoking habits
   - Pet preferences
   - Sleep schedules (night owl/early bird)
   - Cleanliness ratings (1-5 scale)
3. **Listings Management**: CRUD operations for rental properties
4. **Messaging**: Chat functionality between matched users
5. **Booking System**: Schedule property visits and manage requests
6. **Profile Management**: Update user information and preferences

## 📋 Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- CORS
- dotenv

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd WT_Orange
```

### Step 2: Install Root Dependencies
```bash
npm install
```

### Step 3: Backend Setup

1. Navigate to server directory:
```bash
cd server
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Edit `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rentease
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**Important**: If using MongoDB Atlas, replace `MONGODB_URI` with your connection string.

### Step 4: Frontend Setup

1. Navigate to client directory:
```bash
cd ../client
npm install
```

### Step 5: Start MongoDB

If using local MongoDB:
```bash
mongod
```

If using MongoDB Atlas, ensure your connection string is correct in `.env`.

### Step 6: Start the Application

#### Option 1: Start Both Servers Simultaneously (Recommended)
From the root directory:
```bash
npm run dev
```

#### Option 2: Start Servers Separately

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

### Step 7: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

### Client (Frontend)
```
client/
├── src/
│   ├── components/      # Reusable components (Navbar, Footer, etc.)
│   ├── context/         # React Context for global state (AuthContext)
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions (API)
│   ├── App.jsx          # Main App component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html           # HTML template
└── vite.config.js       # Vite configuration
```

### Server (Backend)
```
server/
├── config/              # Database configuration
├── controllers/         # Business logic
├── middleware/          # Custom middleware
├── models/              # Mongoose models
├── routes/              # API routes
├── .env                 # Environment variables
├── server.js            # Entry point
└── package.json         # Dependencies
```

## 🧠 Smart Matching Algorithm

The matching algorithm calculates compatibility scores between users based on lifestyle preferences:

### Factors (50% total weight)
1. **Smoking Habits** (10%): Both smoke or both non-smokers
2. **Pet Preferences** (10%): Both pet lovers or both not pet lovers
3. **Sleep Schedule** (15%): Both night owls or both early birds
4. **Cleanliness** (15%): Similar cleanliness ratings (1-5 scale)

### Formula
```
Score = (smoking_match * 10) + (pet_match * 10) + (sleep_match * 15) + (cleanliness_match * 15)
```

Example:
```javascript
// Both non-smokers, both pet lovers, both night owls, cleanliness 4 vs 5
Score = 10 + 10 + 15 + 13.5 = 48.5% compatibility
```

## 🎨 Key Components

### AuthContext
Manages global authentication state and provides:
- User information
- Login/logout functions
- Profile update
- Token management

## 🔒 Security Features

- JWT token authentication
- Protected API routes
- HTTP-only cookie support
- CORS configuration
- Input validation and sanitization

## 🧪 Testing the Application

### 1. Create Test Users
1. Navigate to `/register`
2. Create 2-3 users with different lifestyle preferences
3. Login with each account in different browsers/incognito windows

### 2. Test Listings
1. Post a listing as User A
2. View listings as User B
3. Check compatibility scores

### 3. Test Matching
1. Navigate to `/match` as a logged-in user
2. View matched roommates with compatibility scores
3. Filter by minimum compatibility threshold

### 4. Test Chat
1. From Match page, click "Send Message" on a matched user
2. Send messages back and forth
3. Test typing indicators

### 5. Test Bookings
1. From a listing details page, click "Book a Visit"
2. Schedule a visit request
3. Login as the listing owner to confirm/decline

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongo --version

# Start MongoDB service
mongod

# Or use MongoDB Compass to verify connection
```