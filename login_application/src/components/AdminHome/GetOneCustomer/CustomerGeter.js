import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../../../store/auth';

import CustomerList from '../CustomerList';
import { Box, Container } from '@mui/material';

const CustomerGeter = (props) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [companys, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFieldChanged = (company) => {
    setIsLoading(true);
    console.log("id"+company.id)
    let newArr = companys.map((item) => {
      if (company.id === item.id) {
        return { ...item, email: company.email ,lastName:company.lastName,firstName:company.firstName};
      } else {
        return item;
      }
    });
    setCustomers(newArr);
    setIsLoading(false);
  };

  const removeHandler = (id) => {
    setIsLoading(true);
    const newList = companys.filter((item) => item.id !== id);
    setCustomers(newList);
    setIsLoading(false);
  };

  const fetchCustomersHandler = useCallback(async () => {
    console.log("hi")
    setIsLoading(true);
    setError(null);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: props.id,
    };
    try {
      const response = await fetch("/admin/getOneCustomer/", requestOptions);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }else if (response.status === 202) {
        window.alert(await response.text())
        props.stopEditingHandler();
      }else{

      console.log("Response Okay!");
      const data = await response.json();
      const transformedcoupons = data.map((companieData) => {
        return {
          id: companieData.id,
          firstName: companieData.firstName,
          lastName: companieData.lastName,
          email: companieData.email,
        };
      });
      setCustomers(transformedcoupons);
    }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, token,props]);

  useEffect(() => {
    fetchCustomersHandler();
  }, [fetchCustomersHandler]);


  let content = <p></p>;

  if (companys.length > 0) {
    content = <CustomerList companys={companys} updateFieldChanged={updateFieldChanged} removeHandler={removeHandler} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >

        <Container maxWidth={false}>
          <section>{content}</section>

        </Container>
      </Box>

    </>
  );
};

export default CustomerGeter;