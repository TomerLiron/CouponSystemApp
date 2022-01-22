import React from 'react';

import classes from '../css/CouponList.module.css';
import classesCoupon from '../css/Coupon.module.css';

const CouponList = (props) => {
  return (
    <ul className={classes['movies-list']}>
    {props.coupos.map((coupon) => (
            <li key={coupon.id} className={classesCoupon.Coupon}>
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