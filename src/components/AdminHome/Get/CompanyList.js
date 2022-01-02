import React from 'react';

import Company from './Company';
import classes from './CouponList.module.css';

const CompanyList = (props) => {
  console.log(props.id)
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((coupon) => (
        <Company
          id={coupon.id}
          name={coupon.name}
          email={coupon.email}
          password={coupon.password}
 
        />
      ))}
    </ul>
  );
};

export default CompanyList;
