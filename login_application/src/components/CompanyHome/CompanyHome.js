import React from 'react';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

import GetCoupon from './Get/GetCoupon';
import AddCoupon from './Add/AddCoupon';
import CompanyDetailsGetter from './GetDetails/CompanyDetailsGetter';

const CompanyHome = () => {
  return (
      <Card className={classes.home}>
        
        <h1>Welcome back!</h1>
        <GetCoupon/>
        <AddCoupon/>
        <CompanyDetailsGetter/>
        
      </Card>

  );
};

export default CompanyHome;
