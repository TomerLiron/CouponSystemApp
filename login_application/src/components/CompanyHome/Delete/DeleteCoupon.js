import './DeleteCoupon.css';
import { useState, useCallback } from 'react';
import { useSelector,useDispatch } from "react-redux";
import {authActions} from '../../../store/auth'
import Button from '@mui/material/Button';





const DeleteCoupon = ({ couponId, onDelete }) => {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();


    const deleteCouponHandler = useCallback(async () => {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                token
            }
        }

        try {
            const response = await fetch('company/deleteCoupon?id=' + couponId, requestOptions)
            if (!response.ok) {
                window.alert("Session timeout!");
                dispatch(authActions.logout())
                throw new Error('Something went wrong!');
            }
            if (response.status === 202) 
            window.alert(await response.text())
            onDelete(couponId);




        } catch (error) {
            console.log(error.message);
        }
    }, [token, couponId, onDelete, dispatch]);



    return (

        <div>
            <Button  onClick={
                deleteCouponHandler

            }
                type='button' > Delete Coupon </Button>

        </div>




    );

}

export default DeleteCoupon;