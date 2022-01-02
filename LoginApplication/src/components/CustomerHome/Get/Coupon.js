import React from 'react';

import classes from './Coupon.module.css';

const Coupon = (props) => {
  return (
    <li className={classes.Coupon}>
      <h2>{props.category}</h2>
      <p>{props.id}</p>
      <p>{props.company}</p>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <h5>{props.amount}</h5>
      <h5>{props.startDate}</h5>
      <h5>{props.endDate}</h5>
      <h5>{props.price}</h5>
      <img src={props.image} alt="" />

    </li>
  );
};

export default Coupon;
