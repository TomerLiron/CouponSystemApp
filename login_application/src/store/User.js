import { createSlice } from '@reduxjs/toolkit';

const userState = {
  User: "company",
};

const UserSlice = createSlice({
  name: 'Userentication',
  initialState: userState,
  reducers: {
    admin(state) {
      localStorage.setItem('user', '3');
      state.User = "admin";
    },
    company(state) {
      localStorage.setItem('user', '1');
      state.User = "company";
    },
    customer(state) {
      localStorage.setItem('user', '2');
      state.User = "customer";
    },
  },
});

export const UserActions = UserSlice.actions;

export default UserSlice.reducer;