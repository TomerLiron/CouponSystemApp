import React from 'react';
import Button from '@mui/material/Button'
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials'
export default function Details(props) {
  return (
    <Card >
      <Box sx={{ minWidth: 1050 }}>

        <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table" >
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
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{props.company.id}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Avatar
                    src={props.company.name}
                    sx={{ mr: 2 }}
                  >
                    {getInitials(props.company.name)}
                  </Avatar>
                  <Typography
                    color="textPrimary"
                    variant="body1"
                  >
                    {props.company.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{props.company.email}</TableCell>
              <TableCell><Button style={{float:"right", width:"175px"}} onClick={props.hideDetails}>Hide</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Card>
  

  );
};

