import React from 'react';

import classesCoupon from './CompanyGeter.module.css';
// import UpdateCompany from '../UpdateCompany/UpdateCompany'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
const CompanyList = (props) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>      {props.companys.map((company) => (
        <ListItemText>
          {/* <UpdateCompany/> */}
          <ListItemText primary={company.name} />
          <h2>{"company name:" + company.name}</h2>
          <p>{"Id:" + company.id}</p>
          <h6>{"company name:" + company.email}</h6>
        </ListItemText>


      ))}
    </List>
    </Box>
  );
};

export default CompanyList;