import React, { useEffect, Fragment } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { loginActions } from './store/login';
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
  const isLogin = useSelector((state) => state.login.isLogin);
  const User = useSelector((state) => state.User.User);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const storedUserUserInformation=localStorage.getItem('user');
    if (storedUserLoggedInInformation === "1") {
      dispatch(loginActions.login());
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
        <companyLogin/>
        <h1>{isLogin}</h1>
        {!isLogin&&User==="company" && <CompanyLogin />}
        {!isLogin&&User==="customer" && <CustomerLogin />}
        {!isLogin&&User==="admin" && <AdminLogin/>}
        {isLogin &&User==="company"&& <CompanyHome />}
        {isLogin &&User==="customer"&& <CustomerHome />}
        {isLogin &&User==="admin"&& <AdminHome />}
      </main>
    </Fragment>
  );
}

export default App;
