// slices/seasonSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  date_debut: '',
  date_fin: '',
  enfants: [],
  groupes:[],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  erreur: null,
};


const seasonSlice = createSlice({
  name: 'season',
  initialState,
  reducers: {
    createSeason(state, action) {
      state.id = action.payload.id;
      state.date_debut = action.payload.date_debut;
      state.date_fin = action.payload.date_fin;
      state.enfants = action.payload.enfants;
      state.groupes = action.payload.groupes; 
      state.status = 'succeeded';
      state.erreur =  null;
    },
    removeSeason(state) {
      state.id = null;
      state.date_debut = '';
      state.date_fin = '';
      state.enfants = [];
      state.groupes = []; 
      state.archived = false;
      state.status = 'idle';
      state.erreur = null;
    },
    updateSeason(state, action) {
      state.date_debut = action.payload.date_debut;
      state.date_fin = action.payload.date_fin;
      state.enfants = action.payload.enfants;
      state.groupes = action.payload.groupes; 
      state.status = 'succeeded';
      state.erreur = null;
    },
    addChildToSeason(state, action) {
      state.enfants.push(action.payload);
    },
    removeChildFromSeason(state, action) {
      state.enfants = state.enfants.filter(child => child.id !== action.payload.id);
    },
    updateChildInSeason(state, action) {
      const index = state.enfants.findIndex(child => child.id === action.payload.id);
      if (index !== -1) {
        state.enfants[index] = action.payload;
      }
    },
    updateErrorSeason(state, action) {
      state.erreur = action.payload;
    },
  },
});

export const { createSeason, removeSeason, updateSeason, addChildToSeason, removeChildFromSeason, updateChildInSeason , updateErrorSeason } = seasonSlice.actions;
export default seasonSlice.reducer;
