import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // Initial theme state
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      // Update HTML root element based on theme
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.querySelector('body').style.backgroundColor = '#000';
      } else {
        document.documentElement.classList.remove('dark');
        document.querySelector('body').style.backgroundColor = '#1f2937';
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
