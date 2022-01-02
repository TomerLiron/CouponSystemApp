import React from 'react';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

import GetCoupon from './Get/GetCoupon';

const CustomerHome = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!Customer</h1>
      <GetCoupon />
    </Card>

  );
};

export default CustomerHome;
