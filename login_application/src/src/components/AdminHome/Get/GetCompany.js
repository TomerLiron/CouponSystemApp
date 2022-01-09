import React, { useState, useCallback } from 'react';

import Button from '../../UI/Button/Button';
import classes from '../Home.module.css';
import CouponList from './CompanyList';

function GetCompany() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchcouponHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('admin/all');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const transformedcoupons = data.map((couponsData) => {
        return {
          id: couponsData.id,
          name: couponsData.name,
          email: couponsData.email,
          password: couponsData.password,

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

export default GetCompany;