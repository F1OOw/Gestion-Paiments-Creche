import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    clearUser(state) {
      state.username = '';
      state.password = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
