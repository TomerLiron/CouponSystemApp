import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import '../Add/Coupon.css'
import '../Delete/DeleteCoupon.css';


export default function UpdateCoupon(props) {

    const token = useSelector(state => state.auth.token);
    

    const handleCouponChange=(coupon)=>{
        const oldCoupon = props.defaultData
        props.onSetData({...oldCoupon,...coupon})
    }

    const handleChange=(changes)=>{
       handleCouponChange({...props.defaultData, ...changes})
      
    }

  

    const submitHandler = useCallback(async (event) => {
        event.preventDefault();
       

        let coupon={
            category: categoryRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            startDate: startDateRef.current.value,
            endDate: endDateRef.current.value,
            amount: amountRef.current.value,
            price: priceRef.current.value,
            image: imageRef.current.value,
        }
        console.log(coupon)
       
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', token},
            body: JSON.stringify({coupon})
        }
        try {
            const response = await fetch('company/updateCoupon/', requestOptions)
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            // props.onSetData(requestOptions.body)

        } catch (error) {
            console.log(error)
        }
        finally{
            props.onUpdate()
        }
       
    },
        [props, token],
    )
    const defaultData ={
     titleDefaultTxt :props.defaultData ==null ? "": props.defaultData.title,
     descriptionDefaultTxt:props.defaultData ==null ? "": props.defaultData.description,
     amountDefaultTxt:props.defaultData ==null ? "": props.defaultData.amount,
     startDateDefaultTxt:props.defaultData ==null ? "": props.defaultData.startDate,
     endDateDefaultTxt:props.defaultData ==null ? "": props.defaultData.endDate,
     priceDefaultTxt:props.defaultData ==null ? "": props.defaultData.price,
     imageDefaultTxt:props.defaultData ==null ? "": props.defaultData.image,
     categoryDefaultTxt:props.defaultData ==null ? "": props.defaultData.category,
    }
    const categoryRef = useRef("");
    const titleRef = useRef("");
    const descriptionRef = useRef("");
    const amountRef = useRef("");
    const startDateRef = useRef("");
    const endDateRef = useRef("");
    const priceRef = useRef("");
    const imageRef = useRef("");
    


    return (

     
        <div className='new-expense'>
        <form id="form" onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" ref={titleRef} defaultValue={defaultData.titleDefaultTxt} onInput={e=> handleChange({title: e.target.value})} />
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="opening-text">Coupon description</label>
                    <textarea rows="5" id="opening-text" ref={descriptionRef} defaultValue={defaultData.descriptionDefaultTxt} onInput={e=> handleChange({description: e.target.value})} ></textarea>
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="amount">amount</label>
                    <input type="number" id="amount" ref={amountRef} defaultValue={defaultData.amountDefaultTxt} onInput={e=> handleChange({amount: e.target.value})} />
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="startDate">start Date</label>
                    <input type="date" id="startDate" ref={startDateRef} defaultValue={defaultData.startDateDefaultTxt} onInput={e=> handleChange({startDate: e.target.value})} />
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="endDate">end Date</label>
                    <input type="date" id="endDate" ref={endDateRef} defaultValue={defaultData.endDateDefaultTxt} onInput={e=> handleChange({endDate: e.target.value})}/>
                    <div className='new-expense__control'>
                        <label htmlFor="price">price</label>
                        <input type="number" min='1' step='0.1' id="price" ref={priceRef} defaultValue={defaultData.priceDefaultTxt} onInput={e=> handleChange({price: e.target.value})}/>
                    </div>
                    <div className='new-expense__control'>
                        <label htmlFor="image">image</label>
                        <input type="text" id="image" ref={imageRef} defaultValue={defaultData.imageDefaultTxt} onInput={e=> handleChange({image: e.target.value})} />
                    </div>
                </div>

                <div className="expenses-filter__control">
                    <label className="expenses-filter__label">Category</label>
                    <select className="expenses-filter__select" ref={categoryRef} defaultValue={defaultData.categoryDefaultTxt} onInput={e=> handleChange({category: e.target.value})}>
                        <option value="FOOD">FOOD</option>
                        <option value="ELECTRICITY">ELECTRICITY</option>
                        <option value="RESTAURANT">RESTAURANT</option>
                        <option value="VACATION">VACATION</option>
                        <option value="FURNITURES">FURNITURES</option>
                        <option value="HARDWARE">HARDWARE</option>
                    </select>
                </div>
                
                <div className='new-expense__actions'>
                    <button onClick={submitHandler} type='submit'>Apply changes</button>
                </div>
                

            </div>

        </form>
        </div>

    )
}
