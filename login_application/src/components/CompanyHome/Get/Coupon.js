import React, { useState } from 'react';

import classes from './Coupon.module.css';
import DeleteCoupon from '../Delete/DeleteCoupon'
import UpdateCoupon from '../update/UpdateCoupon';
import Button from '../../UI/Button/Button';
const Coupon = (props) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(props.coupon)
  let content =(
    <li className={classes.Coupon}>
      <h2>Category: {data.category}</h2>
      <p>Id: {data.id}</p>
      <p>Company Id: {data.company}</p>
      <h3>Title: {data.title}</h3>
      <p>Description: {data.description}</p>
      <h5>Amount: {data.amount}</h5>
      <h5>Start Date: {data.startDate}</h5>
      <h5>End Date: {data.endDate}</h5>
      <h5>Price: {data.price}</h5>
      
      <img src={data.image} alt="" />
      <DeleteCoupon couponId={data.id} onDelete={(id)=>props.onDelete(id)}/>
      <Button onClick={()=>setEdit(true)}>Modify Coupon</Button>
    
    </li>
    )

    if(edit){
      content=(
        <UpdateCoupon onUpdate={()=>setEdit(false)} defaultData={data} onSetData ={newData=>setData(newData)}/>
      )
    }
  return (
  
    {...content}
    
    
  );
};

export default Coupon;
