import React, { Fragment } from 'react';
import UpdateCompany from './UpdateCompany/UpdateCompany'
import DeleteCompany from './DeleteCompany/DeleteCompany'

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
              <TableCell align='center'>
                id
              </TableCell>
              <TableCell align='left'>
                Name
              </TableCell>
              <TableCell align='center'>
                Email
              </TableCell>
              <TableCell align='center'>

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.companys.map((company) => (
              <Fragment key={company.id}>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    {company.id}
                  </TableCell>
                  <TableCell align="center">
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
                  <TableCell align="center">
                    {company.email}
                  </TableCell>
                  <TableCell align="center">
                    <UpdateCompany company={company} updateFieldChanged={props.updateFieldChanged} />
                    <DeleteCompany company={company} removeHandler={props.removeHandler} />
                  </TableCell>
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
