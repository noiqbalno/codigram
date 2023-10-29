import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';

const USERS_URL = `http://localhost:3500/users`;

const initialState = {
  token: null,
  status: 'idle', // idle || loading || succeeded || failed
  error: null,
  statusRegister: 'idle', // idle || loading || succeeded || failed
  errorRegister: null,
};

export const loginApi = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USERS_URL}/login`, data);
      Cookies.set('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USERS_URL}/register`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginApi.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.token = action.payload;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(register.pending, (state, action) => {
        state.statusRegister = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.statusRegister = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.statusRegister = 'failed';
        state.errorRegister = action.error;
      });
  },
});

export const authLogin = (state) => state.auth.token;
export const authLoginStatus = (state) => state.auth.status;
export const authLoginError = (state) => state.auth.error;

export const registerLoginStatus = (state) => state.auth.statusRegister;
export const registerLoginError = (state) => state.auth.errorRegister;

export default authSlice.reducer;
