import React, { useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import { UserActions } from './store/User';

import CustomerLogin from './components/Login/Login';
import CompanyHome from './components/CompanyHome/CompanyHome';
import AdminHome from './components/AdminHome/AdminHome';
import CustomerHome from './components/CustomerHome/CustomerHome';
import MainHeader from './components/MainHeader/MainHeader';
import {  StyledEngineProvider } from '@mui/material';

function App(props) {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const User = useSelector((state) => state.User.User);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const storedUserTokenInInformation = localStorage.getItem('token');
    const storedUserUserInformation = localStorage.getItem('user');
    if (storedUserLoggedInInformation === "1") {
      dispatch(authActions.login(storedUserTokenInInformation));
    }
    if (storedUserUserInformation === "1") {
      dispatch(UserActions.company());
    } else if (storedUserUserInformation === "2") {
      dispatch(UserActions.customer());
    } else {
      dispatch(UserActions.admin());

    }
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
    <main>
      <MainHeader />
        {!isAuth && <CustomerLogin />}
        {isAuth && User === "company" && <CompanyHome />}
        {isAuth && User === "customer" && <CustomerHome />}
        {isAuth && User === "admin" && <AdminHome />}
      </main>
      </StyledEngineProvider>
  );
}

export default App;
