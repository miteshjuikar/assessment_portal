// src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false, 
  isLoading: false, 
  // user: { name:"Mitesh", email:"mitesh@gmial.com", role:"admin" },
  user: null,
  error: null,
};

// Async thunk for login (API call)
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://your-api-url/login', userCredentials);
      return response.data;  // Assuming the response contains the user data
    } catch (error) {
      return rejectWithValue(error.response.data); // If the API call fails
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false; // Ensure the key is consistent
      state.user = null; // Reset the user data on logout
      state.error = null; // Reset the error on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // When loginUser is pending (API call in progress)
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // Set loading to true
        state.error = null; // Clear previous errors
      })
      // When loginUser is fulfilled (API call succeeded)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set authentication to true
        state.user = action.payload; // Store user data from API response
        state.isLoading = false; // Set loading to false
      })
      // When loginUser is rejected (API call failed)
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false on error
        state.error = action.payload || 'Failed to login'; // Set error message
      });
  },
});

// Export actions
export const { logout } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
