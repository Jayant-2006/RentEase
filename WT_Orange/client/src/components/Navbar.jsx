import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">RentEase</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition">
              Home
            </Link>
            <Link to="/listings" className="text-gray-700 hover:text-primary transition">
              Listings
            </Link>
            {user && (
              <>
                <Link to="/match" className="text-gray-700 hover:text-primary transition">
                  Match
                </Link>
                <Link to="/chat" className="text-gray-700 hover:text-primary transition">
                  Chat
                </Link>
                <Link to="/bookings" className="text-gray-700 hover:text-primary transition">
                  Bookings
                </Link>
              </>
            )}
            <Link to="/about" className="text-gray-700 hover:text-primary transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/add-listing"
                  className="btn btn-secondary text-sm"
                >
                  Post Listing
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-primary transition"
                >
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
