import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './login';
import UserReducer from './User';


const store = configureStore({
  reducer: { login:loginReducer, User: UserReducer},
});

export default store;
