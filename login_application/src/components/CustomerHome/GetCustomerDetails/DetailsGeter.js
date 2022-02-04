import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../../../store/auth';

import CustomerList from '../CustomerList';

function DetailsGeter() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [coupos, setCoupons] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCouponsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
    };
    try {
      const response = await fetch("/customer/getCustomerDetails/", requestOptions);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }
      console.log("Response Okay!");
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, token ]);

  useEffect(() => {
    fetchCouponsHandler();
  }, [fetchCouponsHandler]);


  let content = <p></p>;

  if (coupos !==undefined) {
    content = <CustomerList customer={coupos} />;
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


export default DetailsGeter;