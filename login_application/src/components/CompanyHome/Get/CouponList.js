import React, { useState } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import Coupon from './Coupon';

const CouponList = (props) => {

  return (
 
    <div >
      <Card >
      <Box sx={{ minWidth: 1050 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
         
       <TableHead>
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
         <TableBody>
      {props.coupons.map((coupon) => 
      
        <Coupon
          key={coupon.id}
          coupon={coupon} 
          onDelete={(id)=>props.onDelete(id)}/> 
      
       
        )}
        </TableBody>
         </Table>
          </Box>
          </Card>
       
    </div>
  );
};

export default CouponList;
