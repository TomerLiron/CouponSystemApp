import React, { useState, useCallback, useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";

import { authActions } from '../../../store/auth';

function Purchase(props) {
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();


  const submitHandler = useCallback(async () => {
    console.log('Clicked!');
    setIsLoading(true);
    setError(null);


    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: props.id,
    };
    try {
      const response = await fetch("/customer/purchaseCoupon/" , requestOptions);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }
      if (response.status===202){
        window.alert(await response.text())
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    props.stopEditing();
  }, [token, props,dispatch]);

  useEffect(() => {
    submitHandler();
  }, [submitHandler]);

  let content = <p></p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <section>{content}</section>
      </form>
    </div>
  );
};

export default Purchase;