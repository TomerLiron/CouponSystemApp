import React, { Fragment } from 'react';
import UpdateCompany from './UpdateCompany/UpdateCompany'
import DeleteCustomer from './DeleteCustomer/DeleteCompany'

import {  Avatar,Box,Card,Table,TableBody,TableCell,TableHead, TableRow,Typography} from '@mui/material';
import { getInitials } from './get-initials';

const CompanyList = (props) => {
  return (
    <Card >
      <Box sx={{ minWidth: 1050 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
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
              <TableCell align='left'>

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.companys.map((company) => (
              <Fragment key={company.id}>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell style={{ width: '10%' }}>
                    {company.id}
                  </TableCell>
                  <TableCell style={{ width: '35%' }}>
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
                  <TableCell style={{ width: '30%' }}>
                    {company.email}
                  </TableCell>
                  <TableCell style={{ width: '50%' }}>
                    <UpdateCompany company={company} updateFieldChanged={props.updateFieldChanged} />
                    <DeleteCustomer company={company} removeHandler={props.removeHandler} />
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
