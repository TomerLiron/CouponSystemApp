import CouponGeter from './CouponGeter';
import './GetCoupon.css';
import { useState, useRef } from 'react';
import classes from "./CreateCoupon.module.css";
import './Category.css'

const GetCouponByPrice = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const priceRef = useRef("");

            //0000000000001

    const saveExpenseDataHandler = (enteredExpenseData) => {
        setIsEditing(false);
    };

    const startEditingHandler = () => {
        setIsEditing(true);
    };
    const stopEditingHandler = () => {
        setIsEditing(false);
    };
    return (
        <div className='new-expense'>

            {!isEditing && (
                <button onClick={startEditingHandler}>GetCoupon</button>
            )}
          {!isEditing && (
                <div className={classes.control}>
                    <label htmlFor="price">price</label>
                    <input type="number" step={0.01} id="price" ref={priceRef} />
                </div>
            )}

            {isEditing && (<button onClick={stopEditingHandler}>Closed </button>
            )}
            {isEditing && (<CouponGeter price={priceRef.current.value}
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />
            )}
        </div>
    );
};
export default GetCouponByPrice;