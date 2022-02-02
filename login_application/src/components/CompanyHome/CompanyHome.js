import React from 'react';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Box from '@mui/material/Box';

import GetCoupon from './Get/GetCoupon';
import AddCoupon from './Add/AddCoupon';
import CompanyDetailsGetter from './GetDetails/CompanyDetailsGetter';
import { ButtonGroup } from '@mui/material';

const CompanyHome = () => {
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
        <h1>Company Home</h1>
        <GetCoupon/>
        <AddCoupon/>
        <CompanyDetailsGetter/>
        </ButtonGroup>
        </Box>
      

  );
};

export default CompanyHome;
