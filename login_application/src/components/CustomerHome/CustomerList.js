import React, { Fragment } from 'react';

import { Avatar, Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { getInitials } from '../utils/get-initials';

const CompanyList = (props) => {
  return (
    <Card >
      <Box sx={{ minWidth: 1050 }}>
        <Table sx={{
          minWidth: 650, "& th": { fontSize: "1.25rem" }
        }} size="small" aria-label="a dense table" >
          <TableHead >
            <TableRow >
              <TableCell align="center">
                id
              </TableCell>
              <TableCell align="left">
                firstName
              </TableCell>
              <TableCell align="center">
                lastName
              </TableCell>
              <TableCell align="center">
                Email
              </TableCell>
 
            </TableRow>
          </TableHead>
          <TableBody >
              <Fragment key={props.customer.id}>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    {props.customer.id}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={props.customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(props.customer.firstName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {props.customer.firstName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {props.customer.lastName}
                  </TableCell>
                  <TableCell align="center">
                    {props.customer.email}
                  </TableCell>
                </TableRow>
              </Fragment>
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default CompanyList;
