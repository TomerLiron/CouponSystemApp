import React, { useState,useCallback,useEffect, useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import { authActions } from '../../../store/auth';
export default function PriceSorter(props) {
  const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token);
    const [showTextBox, setShowTextBox] = useState(false)
    const priceRef = useRef("")
    const handleSortedData = useCallback(async (event) => {
      setShowTextBox(false)
        event.preventDefault()
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', token }
        };
      
        try {
            const priceInput = priceRef.current.value
          const response = await fetch("/company/getByPrice?price="+priceInput ,requestOptions);
          if (!response.ok) {
            window.alert("Session timeout!");
            dispatch(authActions.logout());
            throw new Error("Something went wrong!");
          }
    
          const data = await response.json();
         
          const transformedData = data.map((couponData) => {
            return {
              id: couponData.id,
              company: couponData.company.id,
              category: couponData.category,
              title: couponData.title,
              description: couponData.description,
              amount: couponData.amount,
              startDate: couponData.startDate,
              endDate: couponData.endDate,
              price: couponData.price,
              image: couponData.image,
              
            };
          });
          props.onSetCoupons(transformedData);
        } catch (error) {
          console.log(error)
        }
       
      }, [dispatch, props, token]);
    
      useEffect(() => {
        handleSortedData();
      }, [handleSortedData]);

      


    let content;
    if(!showTextBox){
    content =  ( <Button onClick ={()=>setShowTextBox(true)}>Sort by price</Button>)
    }
    else{
        content =(<form>
            <label htmlFor='price'>Maximum price</label>
            <input type='number' id='price' name='price' ref={priceRef}/>
            <button type='submit' onClick={handleSortedData}>Sort</button>
            </form>)
    }

  return <div>
      {content}
  </div>;
}
