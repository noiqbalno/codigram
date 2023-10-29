import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const USERS_URL = `http://localhost:3500/users`;
const POST_URL = `http://localhost:3500/posts`;

// const initialState = [
//   {
//     user_id: 2,
//     nama: 'nama admin',
//     username: 'admin123',
//     image: '/sample/sample-profile.jpg',
//   },
// ];
const initialState = {
  userPosts: [],
  profile: [
    {
      user_id: 7,
      nama: 'nama admin',
      username: 'admin123',
      image: '/sample/sample-profile.jpg',
    },
  ],
  status: 'idle', // idle || loading || succeeded || failed
  error: null,
};

export const fetchPostsByUser = createAsyncThunk(
  'profile/fetchPostsByUser',
  async (userId) => {
    const response = await axios.get(`${POST_URL}/user/${userId}`);
    return response.data.data;
  }
);

export const fetchUserById = createAsyncThunk(
  'profile/fetchUserById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USERS_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSLice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPostsByUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.userPosts = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllUserPost = (state) => state.profile.userPosts;
export const getPostUserStatus = (state) => state.profile.status;
export const getPostUserError = (state) => state.profile.error;

export const selectProfile = (state) => state.profile.profile;

export default profileSLice.reducer;
