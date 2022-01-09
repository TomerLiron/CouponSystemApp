import Delete from './Delete';
import './DeleteCoupon.css';
import { useState } from 'react';

const DeleteCoupon = (props) => {
    const [isEditing, setIsEditing] = useState(false);

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
                <button onClick={startEditingHandler}>Delete Coupon</button>
            )}
            {isEditing && (
                <Delete
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={stopEditingHandler}
                />
                // <div>sfg</div>
            )}
        </div>
    );
};
export default DeleteCoupon;