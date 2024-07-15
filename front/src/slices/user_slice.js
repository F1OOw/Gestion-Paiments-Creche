import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'oussama',
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
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
