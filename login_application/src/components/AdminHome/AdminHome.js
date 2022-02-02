import * as React from 'react';
import GetCompany from './GetCompany/GetCompany';
import AddCompany from './AddCompany/AddCompany';
import GetOneCompany from './GetOneCompany/GetOneCompany';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const AdminHome = (props) => {
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
        // justifyContent="center"
        size="large"
        fullWidth={true}
        orientation="vertical"
        aria-label="vertical outlined button group"
        variant="contained"
      >
        <GetCompany />
        <GetOneCompany/>
        <AddCompany />
      </ButtonGroup>
      
    </Box>
  );
};

export default AdminHome;
