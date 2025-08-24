import axios from 'axios';

const API_URL = 'http://localhost:3005/api'; // change to your backend

export const loginAPI = (credentials) => axios.post(`${API_URL}/login`, credentials);
export const registerAPI = (userData) => axios.post(`http://localhost:3005/api/register`,userData);
export const updateProfileAPI = (userId, updatedData) => axios.put(`${API_URL}/update/${userId}`, updatedData);
export const fetchUserAPI = (userId) => axios.get(`${API_URL}/user/${userId}`);

// OTP & Password Reset
export const sendOTPAPI = (email) => axios.post(`${API_URL}/send-otp`, { email });
export const verifyOTPAPI = (email, otp) => axios.post(`${API_URL}/verify-otp`, { email, otp });
export const resetPasswordAPI = (email, newPassword) => axios.post(`${API_URL}/reset-password`, { email, newPassword });
