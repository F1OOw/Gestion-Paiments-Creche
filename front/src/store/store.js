// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user_slice';
import childrenReducer from '../slices/children_slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    children: childrenReducer,
  },
});

export default store;
