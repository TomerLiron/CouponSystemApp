import { createSlice } from '@reduxjs/toolkit';

const userState = {
  User:"company" ,
};

const UserSlice = createSlice({
  name: 'Userentication',
  initialState: userState,
  reducers: {
    admin(state) {
      state.User = "admin";
    },
    company(state) {
      state.User = "company";
    },
    customer(state) {
      state.User = "customer";
    },
  },
});

export const UserActions = UserSlice.actions;

export default UserSlice.reducer;