import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { authActions } from '../../../store/auth';

// import Button from '../../UI/Button/Button';
import Button from '@mui/material/Button';

import classes from '../Home.module.css';
import CategorySorter from '../Sort/CategorySorter';
import PriceSorter from '../Sort/PriceSorter'
import Coupon from './Coupon';
import AddCoupon from '../Add/AddCoupon';
import CouponList from './CouponList';
function GetCoupon() {
  const token = useSelector(state => state.auth.token);
  // const dispatch = useDispatch();
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchCouponsHandler = useCallback(async (event) => {
    const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', token }
        };
        
        
    event.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch("/company/allCoupons" ,requestOptions);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }

      console.log("Response Okay!");
      const data = await response.json();
      console.log(data)
      
      const transformedMovies = data.map((couponData) => {
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
      console.log(transformedMovies)
      setCoupons(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, token]);

  useEffect(() => {
    fetchCouponsHandler();
  }, [fetchCouponsHandler]);


  let content = <p></p>;

  if (coupons.length > 0) {
    content = (
      
     
    <CouponList coupons={coupons}
    onDelete={(id)=>setCoupons(coupons=>coupons.filter((coupon)=>coupon.id!==id))} 
    />
    
    )}
 

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className={classes.actions}>
      <form> 
        
        <Button onClick ={fetchCouponsHandler}>
          GET Coupons
        </Button>
        <CategorySorter onSetCoupons={(data)=>setCoupons(data)}/>
         <PriceSorter onSetCoupons={(data)=>setCoupons(data)}/>
         <AddCoupon onAddCoupon={coupon=>setCoupons(currentCoupons=>{return [...currentCoupons,coupon]})}/>


        <section>{content}</section>
      </form>

    </div>
  );
};

export default GetCoupon;