import React, { useCallback, useEffect, useState, useRef } from 'react';
// import Button from '../../UI/Button/Button';
import Button from '@mui/material/Button';

import '../Add/Category.css'
import { useSelector } from 'react-redux';
export default function CategorySorter(props) {
    const token = useSelector(state => state.auth.token)
    const categoryRef = useRef("")
    const handleCategorySelect = useCallback(async (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', token }
        };

        try {
            let selectedCategory =  categoryRef.current.value
    
            const response = await fetch("/company/getByCategory?category="+selectedCategory , requestOptions);
            if (!response.ok) {
                window.alert("Session timeout!");
            }

            console.log("Response Okay!");
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

    }, [props, token]);




    const [showTextBox, setShowTextBox] = useState(false)
    let content;
    if (!showTextBox) {
        content = (<Button onClick={() => setShowTextBox(true)}>Sort by Category</Button>)
    }
    else {
        content = (<div className="expenses-filter__control">
            <label className="expenses-filter__label">Category</label>
            <select className="expenses-filter__select" ref={categoryRef} onChange={handleCategorySelect}>
                <option value="FOOD">FOOD</option>
                <option value="ELECTRICITY">ELECTRICITY</option>
                <option value="RESTAURANT">RESTAURANT</option>
                <option value="VACATION">VACATION</option>
                <option value="FURNITURES">FURNITURES</option>
                <option value="HARDWARE">HARDWARE</option>
            </select>
         </div>)
    }

    return <div>
        {content}
    </div>;
}
