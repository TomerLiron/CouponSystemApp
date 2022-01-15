import React from 'react';

import classes from './CouponList.module.css';
import classesCoupon from './Coupon.module.css';


const CouponList = (props,key) => {
  console.log("8");
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((coupon) => (
            <li key={props.id} className={classesCoupon.Coupon}>
            <h2>{coupon.title}</h2>
            <h4>{"Category:" + coupon.category}</h4>
            <p>{"Id:" + coupon.id}</p>
            <p>{"company name:" + coupon.company}</p>
            <p>{"" + coupon.description}</p>
            <h5>{"amount of coupon " + coupon.amount}</h5>
            <h5>{"start Date: " + coupon.startDate}</h5>
            <h5>{"end Date: " + coupon.endDate}</h5>
            <h4>{"price:" + coupon.price}</h4>
            <img src={"" + coupon.image} alt="" />
      
          </li>

      ))}
    </ul>
  );
};

export default CouponList;