import './DeleteCoupon.css';
import { useState, useCallback } from 'react';
import { useSelector } from "react-redux";
// import Button from '../../UI/Button/Button'
import Button from '@mui/material/Button';





const DeleteCoupon = ({ couponId, onDelete }) => {
    const token = useSelector(state => state.auth.token);



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
                throw new Error('Something went wrong!');
            }
            onDelete(couponId);




        } catch (error) {
            // setError(error.message);
        }
    }, [couponId, token, onDelete]);



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