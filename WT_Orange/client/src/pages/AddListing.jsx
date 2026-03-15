import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingsAPI } from '../utils/api';

const AddListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rent: '',
    location: '',
    propertyType: 'Room',
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: '',
    amenities: '',
    images: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Process amenities and images
    const amenitiesArray = formData.amenities
      ? formData.amenities.split(',').map((item) => item.trim())
      : [];

    const imagesArray = formData.images
      ? formData.images.split(',').map((item) => item.trim())
      : [];

    const listingData = {
      title: formData.title,
      description: formData.description,
      rent: parseFloat(formData.rent),
      location: formData.location,
      propertyType: formData.propertyType,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      availableFrom: formData.availableFrom,
      amenities: amenitiesArray,
      images: imagesArray,
    };

    try {
      await listingsAPI.create(listingData);
      navigate('/listings');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Listing</h1>
          <p className="mt-2 text-gray-600">
            Share your property with potential roommates
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Property Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="label">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., Spacious 2BR Apartment in Downtown"
                    required
                  />
                </div>

                <div>
                  <label className="label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input"
                    rows="4"
                    placeholder="Describe your property, neighborhood, and what you're looking for in a roommate..."
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Monthly Rent ($) *</label>
                    <input
                      type="number"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      className="input"
                      min="0"
                      placeholder="1200"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input"
                      placeholder="e.g., Manhattan, NY"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Property Type *</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Room">Room</option>
                      <option value="Studio">Studio</option>
                      <option value="Shared Room">Shared Room</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Available From *</label>
                    <input
                      type="date"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Bedrooms *</label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="input"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Bathrooms *</label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className="input"
                      min="0"
                      step="0.5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Amenities</label>
                  <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    className="input"
                    placeholder="WiFi, Parking, Gym, Pool (comma-separated)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate amenities with commas
                  </p>
                </div>

                <div>
                  <label className="label">Image URLs</label>
                  <input
                    type="text"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple image URLs with commas
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {loading ? 'Posting...' : 'Post Listing'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/listings')}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
