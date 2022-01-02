import React, {  Fragment } from 'react';
import { useSelector } from 'react-redux';
// import { LoginActions } from './store/Login';

import CompanyLogin from './components/CompanyLogin/CompanyLogin';
import CustomerLogin from './components/CustomerLogin/CustomerLogin';
import AdminLogin from './components/AdminLogin/AdminLogin';
import CompanyHome from './components/CompanyHome/CompanyHome';
import AdminHome from './components/AdminHome/AdminHome';
import CustomerHome from './components/CustomerHome/CustomerHome';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  // const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const User = useSelector((state) => state.User.User);


  return (
    <Fragment>

      <MainHeader />
      <main>
        <companyLogin/>
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
