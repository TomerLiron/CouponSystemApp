import { configureStore } from '@reduxjs/toolkit';

import UserReducer from './User';
import authReducer from './auth';

const store = configureStore({
  reducer: {  User: UserReducer, auth: authReducer},
});

export default store;
