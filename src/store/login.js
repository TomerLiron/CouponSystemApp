import { createSlice } from '@reduxjs/toolkit';

const isLoginState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'Loginentication',
  initialState: isLoginState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;