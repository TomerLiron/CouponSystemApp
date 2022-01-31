import { useCallback, useEffect, useRef } from 'react';
import './Coupon.css';
import { useDispatch, useSelector } from "react-redux";

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
        // could add validation here...

        //id, String title, String details, String date
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

        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", token},
            body: JSON.stringify(coupon),
        };
        try {
            console.log(coupon)

            const response = await fetch("/company/addCoupon/", requestOptions);
            if (!response.ok) {
                window.alert("Session timeout!");
                // dispatch(loginActions.logout());
                throw new Error("Something went wrong!");
            }

            console.log("Response Okay!");
            console.log("coupon sent to server: " + coupon);
            
           
        } catch (error) {
            window.alert(error)
        }
        finally{
            props.onStopEditing()
        }
        //setIsLoading(false);
    }, [props, token]);
        

    return (
        <form id="form" onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" ref={titleRef} />
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="opening-text">Coupon description</label>
                    <textarea rows="5" id="opening-text" ref={descriptionRef}></textarea>
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
                    <button onClick={submitHandler} type='submit'>Add Coupon</button>
                </div>
                

            </div>

        </form>



    );

}

export default Coupon;