import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
    },
    clearUser(state) {
      state.username = '';
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setUser, clearUser, setError, clearError } = userSlice.actions;
export default userSlice.reducer;
