// src/features/authors/authorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Config/Firebase';

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  const usersList = usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return usersList.filter(user => user.role === 'aurthor');
});

export const authorSlice = createSlice({
  name: 'authors',
  initialState: {
    authors: [],
    status: 'idle',
    error: null
  },
  reducers: {
    approveAuthor: (state, action) => {
      const author = state.authors.find(author => author.id === action.payload);
      if (author) {
        author.status = 'approved';
      }
    },
    declineAuthor: (state, action) => {
      const author = state.authors.find(author => author.id === action.payload);
      if (author) {
        author.status = 'declined';
      }
    },
    deleteAuthor: (state, action) => {
      state.authors = state.authors.filter(author => author.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authors = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { approveAuthor, declineAuthor, deleteAuthor } = authorSlice.actions;

export default authorSlice.reducer;
