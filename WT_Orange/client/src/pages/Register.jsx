import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
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

    const result = await register(userData);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-gray-600">
            Join RentEase to find your perfect roommate or rental
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input"
                    required
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
                    min="18"
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

                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., New York, NY"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="label">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="input"
                  rows="3"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
            </div>

            {/* Lifestyle Preferences */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Lifestyle Preferences
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="smoker"
                    checked={formData.smoker}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 text-gray-700">I am a smoker</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="petLover"
                    checked={formData.petLover}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 text-gray-700">I love pets</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="nightOwl"
                    checked={formData.nightOwl}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 text-gray-700">I am a night owl</label>
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
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Messy</span>
                    <span>Very Clean</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
