import { useState, useEffect } from 'react';
import { listingsAPI } from '../utils/api';
import ListingCard from '../components/ListingCard';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    minRent: '',
    maxRent: '',
    propertyType: '',
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async (filterParams = {}) => {
    setLoading(true);
    try {
      const { data } = await listingsAPI.getAll(filterParams);
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    const filterParams = {};
    
    if (filters.location) filterParams.location = filters.location;
    if (filters.minRent) filterParams.minRent = filters.minRent;
    if (filters.maxRent) filterParams.maxRent = filters.maxRent;
    if (filters.propertyType) filterParams.propertyType = filters.propertyType;

    fetchListings(filterParams);
  };

  const handleClearFilters = () => {
    setFilters({
      location: '',
      minRent: '',
      maxRent: '',
      propertyType: '',
    });
    fetchListings();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Available Listings</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Listings</h2>
          <form onSubmit={handleApplyFilters}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="input"
                  placeholder="e.g., New York"
                />
              </div>

              <div>
                <label className="label">Min Rent ($)</label>
                <input
                  type="number"
                  name="minRent"
                  value={filters.minRent}
                  onChange={handleFilterChange}
                  className="input"
                  placeholder="500"
                />
              </div>

              <div>
                <label className="label">Max Rent ($)</label>
                <input
                  type="number"
                  name="maxRent"
                  value={filters.maxRent}
                  onChange={handleFilterChange}
                  className="input"
                  placeholder="2000"
                />
              </div>

              <div>
                <label className="label">Property Type</label>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  className="input"
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Room">Room</option>
                  <option value="Studio">Studio</option>
                  <option value="Shared Room">Shared Room</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="btn btn-primary">
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleClearFilters}
                className="btn btn-outline"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600 mb-4">No listings found</p>
            <p className="text-gray-500">Try adjusting your filters or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
