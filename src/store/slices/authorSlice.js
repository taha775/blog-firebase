// src/features/moderators/moderatorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Config/Firebase';

export const fetchModerators = createAsyncThunk('moderators/fetchModerators', async () => {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  const usersList = usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return usersList.filter(user => user.role === 'moderator');
});

export const moderatorSlice = createSlice({
  name: 'moderators',
  initialState: {
    moderators: [],
    status: 'idle',
    error: null
  },
  reducers: {
    approveModerator: (state, action) => {
      const moderator = state.moderators.find(moderator => moderator.id === action.payload);
      if (moderator) {
        moderator.status = 'approved';
      }
    },
    declineModerator: (state, action) => {
      const moderator = state.moderators.find(moderator => moderator.id === action.payload);
      if (moderator) {
        moderator.status = 'declined';
      }
    },
    deleteModerator: (state, action) => {
      state.moderators = state.moderators.filter(moderator => moderator.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModerators.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchModerators.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moderators = action.payload;
      })
      .addCase(fetchModerators.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { approveModerator, declineModerator, deleteModerator } = moderatorSlice.actions;

export default moderatorSlice.reducer;
