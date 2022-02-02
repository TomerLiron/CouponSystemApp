import React, { useState, Fragment } from 'react';

import classes from './Coupon.module.css';
import DeleteCoupon from '../Delete/DeleteCoupon'
import UpdateCoupon from '../update/UpdateCoupon';
import Button from '@mui/material/Button';
import {
  Avatar,
  // BottomNavigation,
  Box,
  Card,
  Fade,
  // Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { color } from '@mui/system';

const Coupon = (props) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(props.coupon)

  
  let content = (
    
    <Card >

      <Box sx={{ minWidth: 1050,   '&:hover': {
          backgroundColor: '#66ccff',
          opacity: [0.9, 0.8, 0.7],
          transition: '0.5s'
        } }}>

        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >

          <TableBody>
            <TableHead>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

              >
                <TableCell style={{ width: '5%' }} align='center'>
                  {data.id}
                </TableCell>

                <TableCell color="textPrimary"
                  variant="body1" style={{ width: '5%' }} align='center'>
                  {data.title}

                </TableCell>

                <TableCell style={{ width: '5%' }} align='center'>
                  {data.category}
                </TableCell>

                <TableCell style={{ width: '5%' }} align='center' >
                  {data.description}
                </TableCell>

                <TableCell style={{ width: '5%' }} align='center'>
                  <Avatar
                    src={data.image}
                    sx={{ width: 100, height: 100 }}
                  >
                  </Avatar>
                </TableCell>

                <TableCell style={{ width: '5%' }} align='center'>
                  {data.amount}
                </TableCell>

                <TableCell style={{ width: '5%' }} align='center'>
                  {data.startDate}
                </TableCell>

                <TableCell style={{ width: '5%' }} align='center'>
                  {data.endDate}
                </TableCell>

                 <TableCell style={{ width: '5%' }} align='center'>
                  {data.price}
                </TableCell>

                <TableCell style={{ width: '5%' }} align='center'>
                  <DeleteCoupon couponId={data.id} onDelete={(id) => props.onDelete(id)} />
                  <Button onClick={() => setEdit(true)}>Modify Coupon</Button>
                </TableCell>

              </TableRow>
            </TableHead>
          </TableBody>
        </Table>
      </Box>
    </Card>
    

  )


  if (edit) {
    content = (
      <UpdateCoupon onUpdate={() => setEdit(false)} defaultData={data} onSetData={newData => setData(newData)} />
    )
  }
  return (
    { ...content }

  );
};

export default Coupon;