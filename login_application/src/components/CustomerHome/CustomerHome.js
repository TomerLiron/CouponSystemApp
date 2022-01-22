import React from 'react';
import Card from '../UI/Card/Card';
import classes from './css/Home.module.css';

import GetCoupon from './Get/GetCoupon';
import PurchaseCoupon from './Purchase/PurchaseCoupon';
import GetCouponByCategory from './GetCouponByCategory/GetCouponByCategory'
import GetCouponByPrice from './GetCouponByPrice/GetCouponByPrice';
import GetCustomerDetails from './GetCustomerDetails/GetCustomerDetails';

const CustomerHome = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!Customer</h1>
      <GetCoupon />
      <PurchaseCoupon/>
      <GetCouponByCategory/>
      <GetCouponByPrice/>
      <GetCustomerDetails/>
    </Card>

  );
};

export default CustomerHome;
