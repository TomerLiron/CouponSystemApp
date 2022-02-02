import Coupon from './Coupon';
import './AddCoupon.css';
import { useState } from 'react';
import Button from '@mui/material/Button';


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
        <div >
            {!isEditing && (
                <Button onClick={startEditingHandler}>Add Coupon</Button>
            )}
            {isEditing && (<Coupon 
                    onStopEditing ={stopEditingHandler}
                />
               
            )}
        </div>
    );
};
export default AddCoupon;