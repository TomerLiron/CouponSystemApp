import React,{Fragment} from 'react';
import DeleteCoupon from '../Delete/DeleteCoupon';

import Coupon from './Coupon';
import classes from './CouponList.module.css';
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
import { getInitials } from '../../AdminHome/GetCompany/get-initials';

const CouponList = (props) => {
  return (
 
    <div className={classes['movies-list']}>
      <Card >
      <Box sx={{ minWidth: 1050 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
         
         <TableBody>
       <TableHead >
            <TableRow  >
              <TableCell style={{ width: '3%' }} align='left'>
                Id
              </TableCell>
              <TableCell style={{ width: '2%' }}align='left'>
                Title
              </TableCell>
              <TableCell style={{ width: '5%' }}align='left'>
                Category
              </TableCell>
              <TableCell style={{ width: '5%' }}align='left'>
              Description
              </TableCell>
              <TableCell style={{ width: '5%' }}align='left'>
              Image
              </TableCell>
              <TableCell style={{ width: '5%' }}align='left'>
              Amount
              </TableCell><TableCell style={{ width: '2%' }}align='left'>
              Start Date
              </TableCell><TableCell style={{ width: '2%' }}align='left'>
              End Date
              </TableCell><TableCell style={{ width: '2%' }}align='left'>
              Price
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
