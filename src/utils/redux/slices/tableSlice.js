// slices/tableSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  tableSlice.actions;

export const fetchTableData = () => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const response = await axiosInstance.get('/data'); // Modify the URL as needed
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(
      fetchDataFailure(error.response?.data?.message || 'Failed to fetch data')
    );
  }
};

export default tableSlice.reducer;
