import { useState } from 'react';
import React, {  Fragment } from 'react';
// import Button from '@mui/material/Button';
import UpdateCompany from './UpdateCompany/UpdateCompany'

import {
  Avatar,
  // BottomNavigation,
  Box,
  Card,
  // Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from './get-initials';

const CompanyList = (props) => {
  // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(0);

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;

  //   if (event.target.checked) {
  //     newSelectedCustomerIds = props.customers.map((customer) => customer.id);
  //   } else {
  //     newSelectedCustomerIds = [];
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }
  //   console.log("6")
  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleLimitChange = (event) => {
  //   setLimit(event.target.value);
  // };

  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage);
  // };
  return (
    <Card >
      {/* <PerfectScrollbar> */}
      <Box sx={{ minWidth: 1050 }}>
        
        <Table size='medium' >
          <TableHead >
            <TableRow >
              <TableCell align='left'>
                id
              </TableCell>
              <TableCell align='left'>
                Name
              </TableCell>
              <TableCell align='left'>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.companys.map((company) => (
              <Fragment key={company.id}>
              <TableRow
                hover
                // selected={selectedCustomerIds.indexOf(company.id) !== -1}
              >
                <TableCell>
                  {company.id}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Avatar
                      src={company.avatarUrl}
                      sx={{ mr: 2 }}
                    >
                      {getInitials(company.name)}
                    </Avatar>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      {company.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {company.email}
                </TableCell>
                <UpdateCompany company={company} updateFieldChanged={props.updateFieldChanged} />
              </TableRow>
              </Fragment>
            ))}
           
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default CompanyList;
