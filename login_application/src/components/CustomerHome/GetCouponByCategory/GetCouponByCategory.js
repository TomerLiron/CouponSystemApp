import CouponGeter from './CouponGeter';
import './GetCoupon.css';
import { useState, useRef } from 'react';
import classes from "./CreateCoupon.module.css";
import './Category.css'

const GetCouponByCategory = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const categoryRef = useRef("FOOD");


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
                    <select className="expenses-filter__select" ref={categoryRef}>
                        <option value="FOOD">FOOD</option>
                        <option value="ELECTRICITY">ELECTRICITY</option>
                        <option value="RESTAURANT">RESTAURANT</option>
                        <option value="VACATION">VACATION</option>
                        <option value="FURNITURES">FURNITURES</option>
                        <option value="HARDWARE">HARDWARE</option>

                    </select>
                </div>
            )}
            {isEditing && (<button onClick={stopEditingHandler}>Closed </button>
            )}
            {isEditing && (<CouponGeter Category={categoryRef.current.value}
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />
            )}
        </div>
    );
};
export default GetCouponByCategory;