// import React from 'react';
import * as React from 'react';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import GetCompany from './GetCompany/GetCompany';
import AddCompany from './AddCompany/AddCompany';
import Button from '@mui/material/Button';
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
        justifyContent="center"
        size="large"
        fullWidth="true"
        orientation="vertical"
        aria-label="vertical outlined button group"
        variant="contained"

      >
        <GetCompany />
        <AddCompany />
      </ButtonGroup>
    </Box>
    // <Card className={classes.home}>
    //   <h1>Welcome back!Admin</h1>
    //  <GetCompany/>
    //  <AddCompany/>
    // </Card>

  );
};

export default AdminHome;
