import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/Counter/counterSlice';
import postReducer from '../features/Post/postSlice';
import profileReducer from '../features/Profile/profileSlice';
import authReducer from '../features/Login/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    profile: profileReducer,
    auth: authReducer,
  },
});
