import React, { useEffect, Fragment } from 'react';
import { useSelector,useDispatch } from 'react-redux';
// import Nav from './Nav';
import { authActions } from './store/auth';
import { UserActions } from './store/User';

import CompanyLogin from './components/CompanyLogin/CompanyLogin';
import CustomerLogin from './components/CustomerLogin/CustomerLogin';
import AdminLogin from './components/AdminLogin/AdminLogin';
import CompanyHome from './components/CompanyHome/CompanyHome';
import AdminHome from './components/AdminHome/AdminHome';
import CustomerHome from './components/CustomerHome/CustomerHome';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const User = useSelector((state) => state.User.User);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const storedUserUserInformation=localStorage.getItem('user');
    if (storedUserLoggedInInformation === "1") {
      dispatch(authActions.login());
    }
    if(storedUserUserInformation==="1"){
      dispatch(UserActions.company());
    }else if(storedUserUserInformation==="2"){
      dispatch(UserActions.customer());
    }else{
      dispatch(UserActions.admin());

    }
  }, [dispatch]);

  return (
    <Fragment>

      <MainHeader />
      <main>
        {!isAuth&&User==="company" && <CompanyLogin />}
        {!isAuth&&User==="customer" && <CustomerLogin />}
        {!isAuth&&User==="admin" && <AdminLogin/>}
        {isAuth &&User==="company"&& <CompanyHome />}
        {isAuth &&User==="customer"&& <CustomerHome />}
        {isAuth &&User==="admin"&& <AdminHome />}  
      </main>
    </Fragment>
  );
}

export default App;
