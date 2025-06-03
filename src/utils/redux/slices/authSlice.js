// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.userInfo; // Store user information from response
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axiosInstance.post('/admin-login', credentials); // Adjust endpoint as needed
    const { access_token, userInfo } = response.data.data;

    // Save token to localStorage
    localStorage.setItem('token', access_token);
    localStorage.setItem('role_id', userInfo?.role);

    dispatch(loginSuccess({ userInfo }));

    // Set Authorization header for future requests
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${access_token}`;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
  }
};

export const logoutUser = () => (dispatch) => {
  // Clear token from storage and Axios headers
  localStorage.removeItem('token');
  localStorage.removeItem('role_id');
  delete axiosInstance.defaults.headers.common['Authorization'];
  dispatch(logout());
};

export default authSlice.reducer;
