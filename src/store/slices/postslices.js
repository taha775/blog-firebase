// src/store/slices/postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPost: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    showPost(state) {
      state.showPost = true;
    },
    hidePost(state) {
      state.showPost = false;
    },
  },
});

export const { showPost, hidePost } = postSlice.actions;
export default postSlice.reducer;
