import { useState, useEffect } from 'react';
import { matchAPI } from '../utils/api';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';

const Match = () => {
  const [activeTab, setActiveTab] = useState('roommates');
  const [roommates, setRoommates] = useState([]);
  const [matchedListings, setMatchedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minScore, setMinScore] = useState(50);

  useEffect(() => {
    if (activeTab === 'roommates') {
      fetchMatchedRoommates();
    } else {
      fetchMatchedListings();
    }
  }, [activeTab, minScore]);

  const fetchMatchedRoommates = async () => {
    setLoading(true);
    try {
      const { data } = await matchAPI.getRoommates({ minScore });
      setRoommates(data);
    } catch (error) {
      console.error('Error fetching matched roommates:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatchedListings = async () => {
    setLoading(true);
    try {
      const { data } = await matchAPI.getListings();
      setMatchedListings(data);
    } catch (error) {
      console.error('Error fetching matched listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompatibilityBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect Match</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('roommates')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition ${
                activeTab === 'roommates'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Matched Roommates
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition ${
                activeTab === 'listings'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Matched Listings
            </button>
          </div>

          {activeTab === 'roommates' && (
            <div className="p-6">
              <div className="mb-4">
                <label className="label">
                  Minimum Compatibility Score: {minScore}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={minScore}
                  onChange={(e) => setMinScore(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Finding your matches...</p>
          </div>
        ) : (
          <>
            {activeTab === 'roommates' ? (
              <div>
                {roommates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roommates.map((roommate) => (
                      <div key={roommate._id} className="card">
                        {/* Compatibility Badge */}
                        <div
                          className={`${getCompatibilityBg(
                            roommate.compatibilityScore
                          )} rounded-full px-3 py-1 text-sm font-bold ${getCompatibilityColor(
                            roommate.compatibilityScore
                          )} inline-block mb-3`}
                        >
                          {roommate.compatibilityScore}% Match
                        </div>

                        {/* Profile Info */}
                        <h3 className="text-xl font-bold mb-2">{roommate.name}</h3>
                        <div className="text-gray-600 text-sm space-y-1 mb-3">
                          {roommate.age && <p>Age: {roommate.age}</p>}
                          {roommate.occupation && <p>Occupation: {roommate.occupation}</p>}
                          {roommate.location && (
                            <p className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {roommate.location}
                            </p>
                          )}
                        </div>

                        {roommate.bio && (
                          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                            {roommate.bio}
                          </p>
                        )}

                        {/* Lifestyle Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {roommate.habits.smoker && (
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                              🚬 Smoker
                            </span>
                          )}
                          {roommate.habits.petLover && (
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                              🐾 Pet Lover
                            </span>
                          )}
                          {roommate.habits.nightOwl && (
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                              🌙 Night Owl
                            </span>
                          )}
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            ✨ Cleanliness: {roommate.habits.cleanliness}/5
                          </span>
                        </div>

                        {/* Compatibility Bar */}
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                roommate.compatibilityScore >= 80
                                  ? 'bg-green-500'
                                  : roommate.compatibilityScore >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${roommate.compatibilityScore}%` }}
                            ></div>
                          </div>
                        </div>

                        <Link
                          to="/chat"
                          state={{ userId: roommate._id }}
                          className="btn btn-primary w-full text-center"
                        >
                          Send Message
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-xl text-gray-600 mb-2">No matches found</p>
                    <p className="text-gray-500">
                      Try lowering the minimum compatibility score
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {matchedListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchedListings.map((listing) => (
                      <ListingCard key={listing._id} listing={listing} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-xl text-gray-600 mb-2">No matched listings found</p>
                    <p className="text-gray-500">Check back later for new listings</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Match;
