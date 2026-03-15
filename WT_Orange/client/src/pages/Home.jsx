import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { listingsAPI } from '../utils/api';
import ListingCard from '../components/ListingCard';

const Home = () => {
  const { user } = useAuth();
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  const fetchFeaturedListings = async () => {
    try {
      const { data } = await listingsAPI.getAll({ limit: 3 });
      setFeaturedListings(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect Roommate & Home
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              RentEase uses smart matching algorithms to connect you with compatible
              roommates and rental listings based on your lifestyle preferences.
            </p>
            <div className="flex justify-center space-x-4">
              {user ? (
                <>
                  <Link to="/listings" className="btn bg-white text-primary hover:bg-gray-100">
                    Browse Listings
                  </Link>
                  <Link to="/match" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                    Find Matches
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100">
                    Get Started
                  </Link>
                  <Link to="/listings" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                    Browse Listings
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RentEase?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
              <p className="text-gray-600">
                Our algorithm matches you with compatible roommates based on lifestyle
                preferences like cleanliness, smoking habits, and sleep schedules.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Schedule property visits and manage bookings all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <Link to="/listings" className="text-primary hover:underline">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary mx-auto"></div>
            </div>
          ) : featuredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-12">No listings available yet.</p>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Create Profile</h3>
              <p className="text-gray-600 text-sm">
                Sign up and tell us about your lifestyle preferences
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">Browse or Post</h3>
              <p className="text-gray-600 text-sm">
                Search for listings or post your own room
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Get Matched</h3>
              <p className="text-gray-600 text-sm">
                See compatibility scores with potential roommates
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">Connect & Move In</h3>
              <p className="text-gray-600 text-sm">
                Chat, schedule visits, and find your perfect home
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
            <p className="text-xl mb-8">
              Join thousands of happy renters who found their ideal living situation
            </p>
            <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 text-lg">
              Sign Up Now - It's Free!
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;