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

} from '@mui/material';


const CouponList = (props) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(props.coupon)

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
                Title
              </TableCell>
              <TableCell align='center'>
                Category
              </TableCell>
              <TableCell align='center'>
                Description
              </TableCell>
              <TableCell align='center'>
                Image
              </TableCell>
              <TableCell align='center'>
                Start Date
              </TableCell>
              <TableCell align='center'>
                End Date
              </TableCell>
              <TableCell align='center'>
                Price
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {props.coupos.map((coupon) => (
              <Fragment key={coupon.id}>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    {coupon.id}
                  </TableCell>
                  <TableCell align="center">
                    {coupon.title}
                  </TableCell>
                   <TableCell align="center">
                    {coupon.category}
                  </TableCell>
                  <TableCell align="center">
                    {coupon.description}
                  </TableCell> 
                  <TableCell align="center">
                    <Avatar
                      src={coupon.image}
                      sx={{ width: 100, height: 100 }}
                    >
                    </Avatar>
                  </TableCell>
                  <TableCell align="center">
                    {coupon.startDate}
                  </TableCell>
                  <TableCell align="center">
                    {coupon.endDate}
                  </TableCell>
                  <TableCell align="center">
                    {coupon.price}
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

export default CouponList;
