import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../../../store/auth';
// import { Download as DownloadIcon } from '../../icons/download';

import CouponList from './CompanyList';
import { Box, Container } from '@mui/material';
// import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
// import { DashboardLayout } from '../../components/dashboard-layout';
// import { customers } from '../../__mocks__/customers';



function CompanyGeter() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [companys, setCompanys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFieldChanged = (company) => {
    setIsLoading(true);
    console.log("1324")
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
    content = <CouponList companys={companys} updateFieldChanged={updateFieldChanged} />;
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
          {/* <CustomerListToolbar /> */}
          <section>{content}</section>

        </Container>
      </Box>

    </>
  );
};

export default CompanyGeter;