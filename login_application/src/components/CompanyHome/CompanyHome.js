import React from 'react';
import Box from '@mui/material/Box';
import GetCoupon from './Get/GetCoupon';
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
        <GetCoupon/>
        <CompanyDetailsGetter/>
        </ButtonGroup>
        </Box>
      

  );
};

export default CompanyHome;
