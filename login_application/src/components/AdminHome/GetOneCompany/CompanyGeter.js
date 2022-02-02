import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../../../store/auth';

import CompanyList from '../CompanyList';
import { Box, Container } from '@mui/material';

const CompanyGeter = (props) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [companys, setCompanys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFieldChanged = (company) => {
    setIsLoading(true);
    let newArr = companys.map((item) => {
      if (company.id == item.id) {
        return { ...item, email: company.email };
      } else {
        return item;
      }
    });
    setCompanys(newArr);
    setIsLoading(false);
  };

  const removeHandler = (id) => {
    setIsLoading(true);
    const newList = companys.filter((item) => item.id !== id);
    setCompanys(newList);
    setIsLoading(false);
  };

  const fetchCompanysHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: props.id,
    };
    try {
      const response = await fetch("/admin/getOneCompany/", requestOptions);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }

      console.log("Response Okay!");
      const data = await response.json();
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
  }, [dispatch, token,props.id]);

  useEffect(() => {
    fetchCompanysHandler();
  }, [fetchCompanysHandler]);


  let content = <p></p>;

  if (companys.length > 0) {
    content = <CompanyList companys={companys} updateFieldChanged={updateFieldChanged} removeHandler={removeHandler} />;
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

export default CompanyGeter;