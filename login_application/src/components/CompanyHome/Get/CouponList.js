import React from 'react';
import DeleteCoupon from '../Delete/DeleteCoupon';

import Coupon from './Coupon';
import classes from './CouponList.module.css';


const CouponList = (props) => {
  console.log(props.id)
  return (
    <div className={classes['movies-list']}>
      {props.coupons.map((coupon) => 
      
        <Coupon
          key={coupon.id}
          coupon={coupon} 
          onDelete={(id)=>props.onDelete(id)}/> 
      
       
        )}
       
    </div>
  );
};

export default CouponList;
