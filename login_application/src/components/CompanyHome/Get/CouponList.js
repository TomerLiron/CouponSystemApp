import React, { useState, Fragment } from 'react';
import {
  Avatar, Button,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography
} from '@mui/material';
import DeleteCoupon from '../Delete/DeleteCoupon'

import Paper from '@mui/material/Paper';
import Coupon from './Coupon';

const CouponList = (props) => {
  const [edit, setEdit] = useState(false);

  return (
 
    <div >
      <Card >
      <Box sx={{ minWidth: 1050 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
         
         <TableBody>
       <TableHead >
            <TableRow  >

              <TableCell style={{ width: '5%' }} align='center'>
                Id
              </TableCell>

              <TableCell style={{ width: '5%' }}align='center'>
                Title
              </TableCell>

              <TableCell style={{ width: '5%' }}align='center'>
                Category
              </TableCell>

              <TableCell style={{ width: '5%' }}align='center'>
              Description
              </TableCell>

              <TableCell style={{ width: '10%' }}align='center' >
              Image
              </TableCell>

              <TableCell style={{ width: '5%' }}align='center'>
              Amount
              </TableCell>

              <TableCell style={{ width: '5%' }}align='center'>
              Start Date
              </TableCell>
              
              <TableCell style={{ width: '5%' }}align='center'>
              End Date
              </TableCell>
              
              <TableCell style={{ width: '5%' }}align='center'>
              Price
              </TableCell>

              <TableCell style={{ width: '5%' }}align='center'>
    
              </TableCell>
             
            </TableRow>
          </TableHead>
          </TableBody>
          </Table>
          </Box>
          </Card>
      {props.coupons.map((coupon) => 
      
        <Coupon
          key={coupon.id}
          coupon={coupon} 
          onDelete={(id)=>props.onDelete(id)}/> 
      
       
        )}
       
    </div>
  );
};

export default CouponList;
