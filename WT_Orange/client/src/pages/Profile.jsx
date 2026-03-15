import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { listingsAPI } from '../utils/api';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [myListings, setMyListings] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    location: '',
    bio: '',
    smoker: false,
    petLover: false,
    nightOwl: false,
    cleanliness: 3,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        age: user.age || '',
        gender: user.gender || '',
        occupation: user.occupation || '',
        location: user.location || '',
        bio: user.bio || '',
        smoker: user.habits?.smoker || false,
        petLover: user.habits?.petLover || false,
        nightOwl: user.habits?.nightOwl || false,
        cleanliness: user.habits?.cleanliness || 3,
      });
      fetchMyListings();
    }
  }, [user]);

  const fetchMyListings = async () => {
    try {
      const { data } = await listingsAPI.getMyListings();
      setMyListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const userData = {
      name: formData.name,
      age: formData.age ? parseInt(formData.age) : undefined,
      gender: formData.gender,
      occupation: formData.occupation,
      location: formData.location,
      bio: formData.bio,
      habits: {
        smoker: formData.smoker,
        petLover: formData.petLover,
        nightOwl: formData.nightOwl,
        cleanliness: parseInt(formData.cleanliness),
      },
    };

    const result = await updateProfile(userData);

    if (result.success) {
      setMessage('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.error);
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingsAPI.delete(listingId);
        fetchMyListings();
      } catch (error) {
        console.error('Error deleting listing:', error);
      }
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Personal Information</h2>
                {!editing && (
                  <button onClick={() => setEditing(true)} className="btn btn-primary">
                    Edit Profile
                  </button>
                )}
              </div>

              {message && (
                <div className={`px-4 py-3 rounded mb-4 ${
                  message.includes('success')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {message}
                </div>
              )}

              {editing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="input"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Occupation</label>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="input"
                      rows="3"
                    ></textarea>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Lifestyle Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="smoker"
                          checked={formData.smoker}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label className="ml-2">I am a smoker</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="petLover"
                          checked={formData.petLover}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label className="ml-2">I love pets</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="nightOwl"
                          checked={formData.nightOwl}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label className="ml-2">I am a night owl</label>
                      </div>
                      <div>
                        <label className="label">
                          Cleanliness Level: {formData.cleanliness}/5
                        </label>
                        <input
                          type="range"
                          name="cleanliness"
                          value={formData.cleanliness}
                          onChange={handleChange}
                          min="1"
                          max="5"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    {user.age && (
                      <div>
                        <p className="text-sm text-gray-600">Age</p>
                        <p className="font-semibold">{user.age}</p>
                      </div>
                    )}
                    {user.gender && (
                      <div>
                        <p className="text-sm text-gray-600">Gender</p>
                        <p className="font-semibold">{user.gender}</p>
                      </div>
                    )}
                    {user.occupation && (
                      <div>
                        <p className="text-sm text-gray-600">Occupation</p>
                        <p className="font-semibold">{user.occupation}</p>
                      </div>
                    )}
                    {user.location && (
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-semibold">{user.location}</p>
                      </div>
                    )}
                  </div>
                  {user.bio && (
                    <div>
                      <p className="text-sm text-gray-600">Bio</p>
                      <p className="font-semibold">{user.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* My Listings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">My Listings</h2>
              {myListings.length > 0 ? (
                <div className="space-y-4">
                  {myListings.map((listing) => (
                    <div key={listing._id} className="border rounded p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{listing.title}</h3>
                          <p className="text-gray-600">{listing.location}</p>
                          <p className="text-primary font-semibold">${listing.rent}/mo</p>
                          <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                            listing.status === 'Available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteListing(listing._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">You haven't posted any listings yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Lifestyle Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Smoker</span>
                  <span className="font-semibold">
                    {user.habits?.smoker ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pet Lover</span>
                  <span className="font-semibold">
                    {user.habits?.petLover ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Night Owl</span>
                  <span className="font-semibold">
                    {user.habits?.nightOwl ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cleanliness</span>
                  <span className="font-semibold">
                    {user.habits?.cleanliness || 3}/5
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-indigo-700 text-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">Complete Your Profile</h3>
              <p className="text-sm mb-4">
                A complete profile helps you find better matches!
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">{user.bio ? '✓' : '○'}</span>
                  <span>Add a bio</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{user.age ? '✓' : '○'}</span>
                  <span>Add your age</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{user.occupation ? '✓' : '○'}</span>
                  <span>Add your occupation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
