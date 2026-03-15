import axios from 'axios';

const API_URL = '/api';

// Listings API
export const listingsAPI = {
  getAll: (params) => axios.get(`${API_URL}/listings`, { params }),
  getById: (id) => axios.get(`${API_URL}/listings/${id}`),
  create: (data) => axios.post(`${API_URL}/listings`, data),
  update: (id, data) => axios.put(`${API_URL}/listings/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/listings/${id}`),
  getMyListings: () => axios.get(`${API_URL}/listings/my/listings`),
};

// Match API
export const matchAPI = {
  getRoommates: (params) => axios.get(`${API_URL}/match/roommates`, { params }),
  getListings: (params) => axios.get(`${API_URL}/match/listings`, { params }),
  getCompatibility: (userId) => axios.get(`${API_URL}/match/compatibility/${userId}`),
};

// Chat API
export const chatAPI = {
  getChats: () => axios.get(`${API_URL}/chat`),
  createOrGetChat: (userId) => axios.post(`${API_URL}/chat`, { userId }),
  getMessages: (chatId) => axios.get(`${API_URL}/chat/${chatId}/messages`),
  sendMessage: (chatId, message) =>
    axios.post(`${API_URL}/chat/${chatId}/messages`, { message }),
  deleteChat: (chatId) => axios.delete(`${API_URL}/chat/${chatId}`),
};

// Booking API
export const bookingAPI = {
  getAll: () => axios.get(`${API_URL}/bookings`),
  getReceived: () => axios.get(`${API_URL}/bookings/received`),
  create: (data) => axios.post(`${API_URL}/bookings`, data),
  update: (id, data) => axios.put(`${API_URL}/bookings/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/bookings/${id}`),
};

export default {
  listings: listingsAPI,
  match: matchAPI,
  chat: chatAPI,
  booking: bookingAPI,
};
