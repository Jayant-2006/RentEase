import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bookingAPI, listingsAPI } from '../utils/api';

const Booking = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('myBookings');
  const [myBookings, setMyBookings] = useState([]);
  const [receivedBookings, setReceivedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [formData, setFormData] = useState({
    listingId: '',
    date: '',
    timeSlot: '',
    message: '',
  });

  useEffect(() => {
    fetchBookings();

    // If redirected from listing details
    if (location.state?.listingId) {
      setFormData({ ...formData, listingId: location.state.listingId });
      setShowBookingForm(true);
      fetchListingDetails(location.state.listingId);
    }
  }, [activeTab]);

  const fetchListingDetails = async (listingId) => {
    try {
      const { data } = await listingsAPI.getById(listingId);
      setSelectedListing(data);
    } catch (error) {
      console.error('Error fetching listing:', error);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      if (activeTab === 'myBookings') {
        const { data } = await bookingAPI.getAll();
        setMyBookings(data);
      } else {
        const { data } = await bookingAPI.getReceived();
        setReceivedBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      await bookingAPI.create(formData);
      setShowBookingForm(false);
      setFormData({ listingId: '', date: '', timeSlot: '', message: '' });
      setSelectedListing(null);
      setActiveTab('myBookings');
      fetchBookings();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking');
    }
  };

  const handleUpdateStatus = async (bookingId, status, response = '') => {
    try {
      await bookingAPI.update(bookingId, { status, response });
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingAPI.delete(bookingId);
        fetchBookings();
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bookings</h1>
          {!showBookingForm && (
            <button
              onClick={() => setShowBookingForm(true)}
              className="btn btn-primary"
            >
              + New Booking Request
            </button>
          )}
        </div>

        {/* New Booking Form */}
        {showBookingForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Schedule a Visit</h2>
            <form onSubmit={handleCreateBooking} className="space-y-4">
              {selectedListing && (
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold">{selectedListing.title}</h3>
                  <p className="text-sm text-gray-600">{selectedListing.location}</p>
                </div>
              )}

              {!selectedListing && (
                <div>
                  <label className="label">Listing ID *</label>
                  <input
                    type="text"
                    name="listingId"
                    value={formData.listingId}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter listing ID"
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="label">Time Slot *</label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                    <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                    <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input"
                  rows="3"
                  placeholder="Add any special requests or questions..."
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn btn-primary">
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingForm(false);
                    setFormData({ listingId: '', date: '', timeSlot: '', message: '' });
                    setSelectedListing(null);
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('myBookings')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition ${
                activeTab === 'myBookings'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              My Booking Requests
            </button>
            <button
              onClick={() => setActiveTab('received')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition ${
                activeTab === 'received'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Received Requests
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'myBookings' ? (
              myBookings.length > 0 ? (
                myBookings.map((booking) => (
                  <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          {booking.listingId?.title || 'Listing Not Available'}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {booking.listingId?.location}
                        </p>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-semibold">Date:</span>{' '}
                            {new Date(booking.date).toLocaleDateString()}
                          </p>
                          <p>
                            <span className="font-semibold">Time:</span> {booking.timeSlot}
                          </p>
                          {booking.message && (
                            <p>
                              <span className="font-semibold">Message:</span> {booking.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    {booking.response && (
                      <div className="bg-gray-50 p-3 rounded mb-4">
                        <p className="text-sm">
                          <span className="font-semibold">Response:</span> {booking.response}
                        </p>
                      </div>
                    )}

                    {booking.status === 'Pending' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="btn btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <p className="text-xl text-gray-600">No booking requests yet</p>
                </div>
              )
            ) : receivedBookings.length > 0 ? (
              receivedBookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {booking.listingId?.title || 'Listing Not Available'}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Requested by: <span className="font-semibold">{booking.userId?.name}</span>
                      </p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-semibold">Date:</span>{' '}
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-semibold">Time:</span> {booking.timeSlot}
                        </p>
                        {booking.message && (
                          <p>
                            <span className="font-semibold">Message:</span> {booking.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {booking.status === 'Pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleUpdateStatus(booking._id, 'Confirmed', 'Booking confirmed!')}
                        className="btn btn-secondary"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(booking._id, 'Cancelled', 'Sorry, this time is not available.')}
                        className="btn btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-600">No booking requests received</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
