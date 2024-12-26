import { backendDomainName } from '@/common/helper';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false, 
  isLoading: false, 
  user: null,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendDomainName}api/auth/register`, userCredentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // If the API call fails
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendDomainName}api/auth/login`, 
        userCredentials,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // If the API call fails
    }
  }
);


export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async () => {
    try {
      const response = await axios.get(
        `${backendDomainName}api/auth/check-auth`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // If the API call fails
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    try {
      const response = await axios.post(
        `${backendDomainName}api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
  
      return response.data;
      
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
      // When registerUser is pending (API call in progress)
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      // When registerUser is fulfilled (API call succeeded)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = false; 
        state.user = null; 
        state.isLoading = false; 
      })
      // When registerUser is rejected (API call failed)
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false on error
        state.error = action.payload || 'Failed to register'; // Set error message
      })


      // When loginUser is pending (API call in progress)
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // When loginUser is fulfilled (API call succeeded)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
        state.isLoading = false; 
      })
      // When loginUser is rejected (API call failed)
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload || 'Failed to login';
      })


      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const { logout } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
