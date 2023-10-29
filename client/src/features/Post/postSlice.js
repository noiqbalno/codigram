import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const POST_URL = `http://localhost:3500/posts`;

// const initialState =
// [
// {
//   id: 1,
//   user_id: 1,
//   caption: 'caption',
//   image: '/sample/sample-post.jpg',
//   createdat: '2023-10-25T21:43:08.366Z',
//   updatedat: '2023-10-25T21:43:08.446Z',
//   user: {
//     nama: 'nama admin',
//     username: 'admin123',
//     image: '/sample/sample-profile.jpg',
//   },
// },
// {
//   id: 2,
//   user_id: 1,
//   caption: 'caption 2',
//   image: '/sample/sample-post.jpg',
//   createdat: '2023-10-25T21:43:08.366Z',
//   updatedat: '2023-10-25T21:43:08.446Z',
//   user: {
//     nama: 'nama admin',
//     username: 'admin123',
//     image: '/sample/sample-profile.jpg',
//   },
// },
// ];
const initialState = {
  post: [],
  status: 'idle', // idle || loading || succeeded || failed
  error: null,
  // postSingle: null,
  postSingle: null,
  statusSingle: 'idle', // idle || loading || succeeded || failed
  errorSingle: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POST_URL);
  return response.data.data;
});

export const fetchPostsByUser = createAsyncThunk(
  'profile/fetchPostsByUser',
  async (userId) => {
    const response = await axios.get(`${POST_URL}/user/${userId}`);
    return response.data.data;
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id) => {
    const response = await axios.get(`${POST_URL}/detail/${id}`);
    return response.data.data;
  }
);

export const addNewPost = createAsyncThunk('posts/addNewPost', async (data) => {
  const response = await axios({
    method: 'POST',
    url: `${POST_URL}/create`,
    headers: {
      Authorization: Cookies.get('accessToken'),
    },
    data: data,
  });

  return response.data;
});

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (data, { rejectWithValue }) => {
    try {
      let formData = data;
      const entries = formData.entries();
      const payload = Object.fromEntries(entries);

      const response = await axios({
        method: 'PUT',
        url: `${POST_URL}/update/${payload.id}`,
        headers: {
          Authorization: Cookies.get('accessToken'),
        },
        data: data,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  'auth/login',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${POST_URL}/delete/${id}`,
        headers: {
          Authorization: Cookies.get('accessToken'),
        },
      });

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // postAdded(state, action) {
    //   state.post.push(action.payload);
    // },
    postAdded: {
      reducer(state, action) {
        state.post.push(action.payload);
      },
      prepare(image, caption, userId) {
        return {
          payload: {
            id: nanoid(),
            image,
            caption,
            user_id: userId,
            createdat: new Date(),
            updatedat: new Date(),
            user: {
              nama: 'nama admin',
              username: 'admin123',
              image: '/sample/sample-profile.jpg',
            },
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.post = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.post.push(action.payload);
      })
      .addCase(fetchPostById.pending, (state, action) => {
        state.statusSingle = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.statusSingle = 'succeeded';

        state.postSingle = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.statusSingle = 'failed';
        state.errorSingle = action.error.message;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }
        const { id } = action.payload;
        const post = state.post.filter((item) => item.id !== id);
        state.post = [...post, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }
        const { id } = action.payload;
        const post = state.post.filter((item) => item.id !== id);
        state.post = post;
      });
  },
});

export const selectAllPost = (state) => state.post.post;
export const getPostStatus = (state) => state.post.status;
export const getPostError = (state) => state.post.error;

export const selectPostId = (state) => state.post.postSingle;
export const getPostIdStatus = (state) => state.post.statusSingle;
export const getPostIdError = (state) => state.post.errorSingle;

export const selectPostById = (state, postId) =>
  state.post.post.find((item) => item.id === postId);

// export const selectPostByIdTwo = (state, postId) => state.post.

export const { postAdded } = postSlice.actions;

export default postSlice.reducer;
