import React, { useState, useCallback } from 'react';

import Button from '../../UI/Button/Button';
import classes from '../Home.module.css';
import CouponList from './CouponList';

function GetCoupon() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchcouponHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('company/all');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const transformedcoupons = data.map((couponsData) => {
        return {
          id: couponsData.id,
          company: couponsData.company,
          category: couponsData.category,
          title: couponsData.title,
          description: couponsData.description,
          amount: couponsData.amount,
          startDate: couponsData.startDate,
          endDate: couponsData.endDate,
          price: couponsData.price,
          image: couponsData.image,

        };
      });

      setMovies(transformedcoupons);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);


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
      <Button type="submit" onClick={fetchcouponHandler} className={classes.btn}>
        Fetch
      </Button>
      <section>{content}</section>
    </div>
  );
};

export default GetCoupon;