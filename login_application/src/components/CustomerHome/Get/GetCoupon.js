import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../../../store/auth';

import Button from '../../UI/Button/Button';
import classes from '../Home.module.css';
import CouponList from './CouponList';

function GetCoupon() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCouponsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/customer/all/" + token);
      if (!response.ok) {
        window.alert("Session timeout!");
        // dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }

      console.log("Response Okay!");
      const data = await response.json();
      console.log(JSON.stringify(data));
      // id: 0
      // title":"Coupon_49","
      // details":"This is a discription for coupon 49","
      // date":"Sun Jan 02 21:45:14 IST 2022"}
      const transformedMovies = data.map((couponData) => {
        return {
          id: couponData.id,
          company: couponData.company,
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
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, token]);

  useEffect(() => {
    fetchCouponsHandler();
  }, [fetchCouponsHandler]);


  let content = <p></p>;

  if (movies.length > 0) {
    content = <CouponList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className={classes.actions}>
      <form onSubmit={fetchCouponsHandler}>
        <Button type="submit" className={classes.btn}>
          GET Coupon
        </Button>
        <section>{content}</section>
      </form>

    </div>
  );
};

export default GetCoupon;