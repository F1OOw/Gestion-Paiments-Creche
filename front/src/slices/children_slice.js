// slices/childrenSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { removeChildFromSeason } from './season_slice';
import { useDispatch } from 'react-redux';

// const initialState = [];

const initialState = {
  children: [] ,
};


const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {
    loadChildren(state,action){
      state.children = action.payload
    },
    addChild(state, action) {
      state.children.push(action.payload);
    },
    removeChild(state, action) {
      const index = state.children.findIndex(child => child.id === action.payload.id);
      if (index==0){
        state.children.splice(0,1);
      } else {
        state.children.splice(index,index);
      }
    },
    updateChild(state, action) {
      const index = state.children.findIndex(child => child.id === action.payload.id);
      if (index !== -1) {
        state.children[index] = action.payload;
      }
    },
  },
});

export const { addChild, removeChild, updateChild, loadChildren } = childrenSlice.actions;
export default childrenSlice.reducer;
