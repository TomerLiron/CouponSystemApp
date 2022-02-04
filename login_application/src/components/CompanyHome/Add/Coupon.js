import { useCallback, useRef } from 'react';
import './Coupon.css';
import { useSelector } from "react-redux";
import '../Add/AddCoupon.css'
import { Button } from '@mui/material';
const Coupon = (props) => {
    const token = useSelector(state => state.auth.token);

    const categoryRef = useRef("");
    const titleRef = useRef("");
    const descriptionRef = useRef("");
    const amountRef = useRef("");
    const startDateRef = useRef("")
    const endDateRef = useRef("")
    const priceRef = useRef("");
    const imageRef = useRef("");


    const submitHandler = useCallback(async (event) => {
        event.preventDefault();

        let coupon = {
            category: categoryRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            startDate: startDateRef.current.value,
            endDate: endDateRef.current.value,
            amount: amountRef.current.value,
            price: priceRef.current.value,
            image: imageRef.current.value,

        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", token},
            body: JSON.stringify(coupon),
        };
        try {
            
            const response = await fetch("/company/addCoupon/", requestOptions);
            if (!response.ok) {
                window.alert("Session timeout!");
                // dispatch(loginActions.logout());
                throw new Error("Something went wrong!");
            }
            props.onAddCoupon(coupon)

            
           
        } catch (error) {
            window.alert(error)
        }
        finally{
            props.onStopEditing()
        }
    }, [props, token]);
        

    return (
        <div className='new__expense'>
        <form id="form" onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" ref={titleRef} />
                </div>
               
                <div className='new-expense__control'>
                    <label htmlFor="amount">amount</label>
                    <input type="number" id="amount" ref={amountRef} />
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="startDate">start Date</label>
                    <input type="date" id="startDate" ref={startDateRef} />
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="endDate">end Date</label>
                    <input type="date" id="endDate" ref={endDateRef} />
                    <div className='new-expense__control'>
                        <label htmlFor="price">price</label>
                        <input type="number" min='1' step='0.1' id="price" ref={priceRef} />
                    </div>
                    <div className='new-expense__control'>
                        <label htmlFor="image">image</label>
                        <input type="text" id="image" ref={imageRef} />
                    </div>
                     <div className='new-expense__control'>
                    <label htmlFor="opening-text">Coupon description</label>
                    <textarea rows="5" id="opening-text" ref={descriptionRef}></textarea>
                </div>
                </div>

                <div className="expenses-filter__control">
                    <label className="expenses-filter__label">Category</label>
                    <select className="expenses-filter__select" ref={categoryRef}>
                        <option value="FOOD">FOOD</option>
                        <option value="ELECTRICITY">ELECTRICITY</option>
                        <option value="RESTAURANT">RESTAURANT</option>
                        <option value="VACATION">VACATION</option>
                        <option value="FURNITURES">FURNITURES</option>
                        <option value="HARDWARE">HARDWARE</option>
                    </select>
                </div>
                
                <div className='new-expense__actions'>
                    <Button style={{paddingLeft:'20px'}} onClick={submitHandler} type='submit'>Add Coupon</Button>
                    <Button onClick={props.onStopEditing}> Cancel </Button>
                </div>
                

            </div>

        </form>
        </div>



    );

}

export default Coupon;