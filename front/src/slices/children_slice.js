// slices/childrenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {
    addChild(state, action) {
      state.push(action.payload);
    },
    removeChild(state, action) {
      return state.filter(child => child.id !== action.payload.id);
    },
    updateChild(state, action) {
      const index = state.findIndex(child => child.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addChild, removeChild, updateChild, loadChildren } = childrenSlice.actions;
export default childrenSlice.reducer;
