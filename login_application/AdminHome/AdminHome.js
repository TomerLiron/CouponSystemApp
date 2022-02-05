import * as React from 'react';
import GetCompany from './GetCompany/GetCompany';
import GetCustomer from './GetCustomer/GetCustomer';
import AddCompany from './AddCompany/AddCompany';
import AddCustomer from './AddCustomer/AddCustomer';
import GetOneCompany from './GetOneCompany/GetOneCompany';
import GetOneCustomer from './GetOneCustomer/GetOneCustomer';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const AdminHome = () => {

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
      }}
    >
      <ButtonGroup
        size="large"
        fullWidth={true}
        orientation="vertical"
        aria-label="vertical outlined button group"
        variant="contained"
      >
        <GetCompany />
        <GetOneCompany/>
        <AddCompany />
        <GetCustomer/>
        <AddCustomer/>
        <GetOneCustomer/>
      </ButtonGroup>
      
    </Box>
  );
};

export default AdminHome;
