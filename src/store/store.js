import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeslice'; // Adjust the path as needed
import layoutReducer  from "./slices/layoutslice"
import postReducer from "./slices/postslices"
import moderatorReducer from './slices/authorSlice';


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    layout:layoutReducer,
    post: postReducer,
    moderators: moderatorReducer,

    // Add your theme reducer to the store
    // Add other reducers here as needed
  },
});
 