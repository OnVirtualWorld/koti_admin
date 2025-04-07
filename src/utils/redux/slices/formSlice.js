import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    createFormStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createFormSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    createFormFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFormStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateFormSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    updateFormFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearFormState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  createFormStart,
  createFormSuccess,
  createFormFailure,
  updateFormStart,
  updateFormSuccess,
  updateFormFailure,
  clearFormState,
} = formSlice.actions;

/**
 * Create Form Handler
 * @param {string} endpoint - API endpoint for form creation.
 * @param {Object} formData - Form data to be sent.
 */
export const createForm = (endpoint, formData) => async (dispatch) => {
  dispatch(createFormStart());
  try {
    const response = await axiosInstance.post(endpoint, formData);
    dispatch(createFormSuccess(response.data));
  } catch (error) {
    dispatch(
      createFormFailure(error.response?.data?.message || 'Error occurred')
    );
  }
};

/**
 * Update Form Handler
 * @param {string} endpoint - API endpoint for updating a form.
 * @param {Object} formData - Updated form data.
 */
export const updateForm = (endpoint, formData) => async (dispatch) => {
  dispatch(updateFormStart());
  try {
    const response = await axiosInstance.put(endpoint, formData);
    dispatch(updateFormSuccess(response.data));
  } catch (error) {
    dispatch(
      updateFormFailure(error.response?.data?.message || 'Error occurred')
    );
  }
};

/**
 * Reset form state to initial state.
 */
export const resetFormState = () => (dispatch) => {
  dispatch(clearFormState());
};

export default formSlice.reducer;
