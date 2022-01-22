import React from 'react';

import classes from '../css/CouponList.module.css';
import classesCoupon from '../css/Coupon.module.css';


const CouponList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      <li className={classesCoupon.Coupon}>
        <p>{"first Name:" + props.customer.firstName}</p>
        <p>{"last Name:" + props.customer.lastName}</p>
        <p>{"Id:" + props.customer.id}</p>
        <p>{"email:" + props.customer.email}</p>
      </li>



    </ul>
  );
};


export default CouponList;