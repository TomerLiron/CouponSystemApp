import React, { useState } from 'react';

import DeleteCoupon from '../Delete/DeleteCoupon'
import UpdateCoupon from '../update/UpdateCoupon';
import Button from '@mui/material/Button';
import {
  Avatar,
  TableCell,
  TableRow,
} from '@mui/material';

const Coupon = (props) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(props.coupon)

  
  let content = (
    
   

              <TableRow 
                sx={{ '&:last-child td, &:last-child th': { border: 0 },  '&:hover': {
                },}}
                hover={true}
               
                

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
                    style={{marginLeft:"120px"}}
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