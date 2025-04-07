// store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import authReducer from './slices/authSlice';
import tableReducer from './slices/tableSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    auth: authReducer,
    table: tableReducer,
  },
});

export default store;
