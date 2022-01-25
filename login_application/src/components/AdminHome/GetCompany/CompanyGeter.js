import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../../../store/auth';

import CouponList from './CompanyList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function CompanyGeter() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [companys , setCompanys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCouponsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/admin/getAllCompanies/" + token);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }

      console.log("Response Okay!");
      const data = await response.json();
      console.log(JSON.stringify(data));
      const transformedcoupons = data.map((companieData) => {
        return {
          id: companieData.id,
          name: companieData.name,
          email: companieData.email,
        };
      });
      setCompanys(transformedcoupons);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, token]);

  useEffect(() => {
    fetchCouponsHandler();
  }, [fetchCouponsHandler]);


  let content = <p></p>;

  if (companys.length > 0) {
    content = <CouponList companys={companys} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div >
      <form onSubmit={fetchCouponsHandler}>
        <section>{content}</section>
      </form>
    </div>
  );
};

export default CompanyGeter;