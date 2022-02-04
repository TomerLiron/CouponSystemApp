import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../../../store/auth';

import CouponList from '../CouponList';

function CouponGeter() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [coupos, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCouponsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);




    try {
      const response = await fetch("/customer/all/" + token);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }

      console.log("Response Okay!");
      const data = await response.json();
      const transformedcoupons = data.map((couponData) => {
        return {
          id: couponData.id,
          company: couponData.company.name,
          category: couponData.category,
          title: couponData.title,
          description: couponData.description,
          amount: couponData.amount,
          startDate: couponData.startDate,
          endDate: couponData.endDate,
          price: couponData.price,
          image: couponData.image,

        };
      });
      setCoupons(transformedcoupons);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, token]);

  useEffect(() => {
    fetchCouponsHandler();
  }, [fetchCouponsHandler]);


  let content = <p></p>;

  if (coupos.length > 0) {
    content = <CouponList coupos={coupos} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div>
      <form onSubmit={fetchCouponsHandler}>
        <section>{content}</section>
      </form>
    </div>
  );
};

export default CouponGeter;