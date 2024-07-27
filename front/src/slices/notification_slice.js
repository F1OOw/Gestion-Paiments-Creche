import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  isError: true
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
      state.isError = action.payload.isError;
    },
    clearNotification(state) {
      state.message = null;
      state.isError = true;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
