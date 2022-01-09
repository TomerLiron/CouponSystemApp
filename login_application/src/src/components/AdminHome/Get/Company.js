import React from 'react';

import classes from './Coupon.module.css';

const Company = (props) => {
  return (
    <li className={classes.Coupon}>
      <h2>{props.name}</h2>
      <p>{props.id}</p>
      <p>{props.email}</p>
      <h3>{props.passwordb}</h3>
    </li>
  );
};

export default Company;
