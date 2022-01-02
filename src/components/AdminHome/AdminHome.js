import React from 'react';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import GetCompany from './Get/GetCompany';

const AdminHome = (props) => {
  return (
      <Card className={classes.home}>
        <h1>Welcome back!Admin</h1>
       <GetCompany/>
      </Card>

  );
};

export default AdminHome;
