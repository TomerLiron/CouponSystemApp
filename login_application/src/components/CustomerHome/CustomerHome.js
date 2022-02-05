import React from 'react';
import Box from '@mui/material/Box';
import GetCoupon from './Get/GetCoupon';
import PurchaseCoupon from './Purchase/PurchaseCoupon';
import GetCouponByCategory from './GetCouponByCategory/GetCouponByCategory'
import GetCouponByPrice from './GetCouponByPrice/GetCouponByPrice';
import GetCustomerDetails from './GetCustomerDetails/GetCustomerDetails';
import { ButtonGroup } from '@mui/material';

const CustomerHome = (props) => {
  return (
    <Box
      sx={{

        display: 'flex',
        '& > *': {
          m: 1,
          boxShadow: 5,
          borderRadius: 2,
          p: 2,
        },
      }}>
      <ButtonGroup
        size="large"
        fullWidth={true}
        orientation="vertical"
        aria-label="vertical outlined button group"
        variant="contained">
        <GetCoupon />
        <PurchaseCoupon />
        <GetCouponByCategory />
        <GetCouponByPrice />
        <GetCustomerDetails />
      </ButtonGroup>
    </Box>

  );
};

export default CustomerHome;
