import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { listingsAPI, chatAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ListingDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const { data } = await listingsAPI.getById(id);
      setListing(data);
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactOwner = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await chatAPI.createOrGetChat(listing.postedBy._id);
      navigate('/chat', { state: { chatId: data._id } });
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleBookVisit = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/bookings', { state: { listingId: listing._id } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
          <Link to="/listings" className="btn btn-primary">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/listings" className="text-primary hover:underline mb-4 inline-block">
          ← Back to Listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="bg-gray-200 h-96 rounded-lg mb-6 overflow-hidden">
              {listing.images && listing.images.length > 0 ? (
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xl">
                  No Image Available
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">{listing.title}</h1>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    listing.status === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {listing.status}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{listing.location}</span>
              </div>

              <div className="text-4xl font-bold text-primary mb-4">
                ${listing.rent}/month
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-2xl font-bold">{listing.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-2xl font-bold">{listing.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-lg font-bold">{listing.propertyType}</div>
                  <div className="text-sm text-gray-600">Type</div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </div>

              {listing.amenities && listing.amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold mb-2">Available From</h2>
                <p className="text-gray-700">
                  {new Date(listing.availableFrom).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Owner Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Posted By</h2>
              <div className="mb-4">
                <p className="font-semibold text-lg">{listing.postedBy.name}</p>
                <p className="text-gray-600">{listing.postedBy.location}</p>
              </div>

              {listing.postedBy.bio && (
                <p className="text-gray-700 text-sm mb-4">{listing.postedBy.bio}</p>
              )}

              {listing.compatibilityScore && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Compatibility</span>
                    <span className="font-bold text-primary">
                      {listing.compatibilityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{ width: `${listing.compatibilityScore}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {user && user._id !== listing.postedBy._id && (
                <div className="space-y-3">
                  <button onClick={handleContactOwner} className="btn btn-primary w-full">
                    Contact Owner
                  </button>
                  <button onClick={handleBookVisit} className="btn btn-secondary w-full">
                    Book a Visit
                  </button>
                </div>
              )}

              {!user && (
                <div className="space-y-3">
                  <Link to="/login" className="btn btn-primary w-full text-center">
                    Login to Contact
                  </Link>
                </div>
              )}
            </div>

            {/* Lifestyle Info */}
            {listing.postedBy.habits && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Owner's Lifestyle</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Smoker</span>
                    <span className="font-semibold">
                      {listing.postedBy.habits.smoker ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pet Lover</span>
                    <span className="font-semibold">
                      {listing.postedBy.habits.petLover ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Night Owl</span>
                    <span className="font-semibold">
                      {listing.postedBy.habits.nightOwl ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cleanliness</span>
                    <span className="font-semibold">
                      {listing.postedBy.habits.cleanliness}/5
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
