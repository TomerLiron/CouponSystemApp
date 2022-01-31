import Coupon from './Coupon';
import './AddCoupon.css';
import { useState } from 'react';

const AddCoupon = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const saveExpenseDataHandler = (enteredExpenseData) => {
        // const expenseData = {
        //     ...enteredExpenseData,
        //     id: Math.random().toString(),
        // };
        // props.onAddExpense(expenseData);
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
                <button onClick={startEditingHandler}>AddCoupon</button>
            )}
            {isEditing && (<Coupon 
                    onStopEditing ={stopEditingHandler}
                />
               
            )}
        </div>
    );
};
export default AddCoupon;