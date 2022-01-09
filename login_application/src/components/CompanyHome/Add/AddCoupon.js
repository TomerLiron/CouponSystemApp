import Coupon from './Coupon';
import './AddCoupon.css';
import { useState } from 'react';

const DeleteCoupon = (props) => {
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
        console.log('2')
        setIsEditing(true);
    };
    const stopEditingHandler = () => {
        console.log('3');

        setIsEditing(false);
    };
    return (
        <div className='new-expense'>
            {!isEditing && (
                <button onClick={startEditingHandler}>AddCoupon</button>
            )}
            {isEditing && (<Coupon
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={stopEditingHandler}
                />
               
            )}
        </div>
    );
};
export default DeleteCoupon;