// slices/seasonSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  date_debut: '',
  date_fin: '',
  children: [],
  archived: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const loadSeason = createAsyncThunk('season/loadSeason', async () => {
  const response = await fetch('/api/season'); //here put the api
  const data = await response.json();
  return data;
});

const seasonSlice = createSlice({
  name: 'season',
  initialState,
  reducers: {
    createSeason(state, action) {
      state.id = action.payload.id;
      state.date_debut = action.payload.date_debut;
      state.date_fin = action.payload.date_fin;
      state.children = action.payload.children;
      state.archived = false;
      state.status = 'succeeded';
    },
    removeSeason(state) {
      state.id = null;
      state.date_debut = '';
      state.date_fin = '';
      state.children = [];
      state.archived = false;
        state.status = 'idle';
    },
    updateSeason(state, action) {
      state.date_debut = action.payload.date_debut;
      state.date_fin = action.payload.date_fin;
      state.children = action.payload.children;
    },
    archiveSeason(state) {
      state.archived = true;
    },
    addChildToSeason(state, action) {
      state.children.push(action.payload);
    },
    removeChildFromSeason(state, action) {
      state.children = state.children.filter(child => child.id !== action.payload.id);
    },
    updateChildInSeason(state, action) {
      const index = state.children.findIndex(child => child.id === action.payload.id);
      if (index !== -1) {
        state.children[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSeason.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadSeason.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.id = action.payload.id;
        state.date_debut = action.payload.date_debut;
        state.date_fin = action.payload.date_fin;
        state.children = action.payload.children;
        state.archived = action.payload.archived;
        state.isInitial = false; 
      })
      .addCase(loadSeason.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { createSeason, removeSeason, updateSeason, archiveSeason, addChildToSeason, removeChildFromSeason, updateChildInSeason } = seasonSlice.actions;
export default seasonSlice.reducer;
