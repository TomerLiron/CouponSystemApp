import React from 'react';

import Coupon from './Coupon';
import classes from './CouponList.module.css';

const CouponList = (props) => {
  console.log(props.id)
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((coupon) => (
        <Coupon
          id={coupon.id}
          company={coupon.company}
          category={coupon.category}
          title={coupon.title}
          description={coupon.description}
          amount={coupon.amount}
          startDate={coupon.startDate}
          endDate={coupon.endDate}
          price={coupon.price}
          image={coupon.image}
        />
      ))}
    </ul>
  );
};

export default CouponList;
