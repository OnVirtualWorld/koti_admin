// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:5000/api', // Your API base URL
  baseURL: 'https://pilot.pritom.me/api/v1', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add an interceptor to attach the token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Please log in again');
      // Optionally redirect to login page
      window.location.href = '/';
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
