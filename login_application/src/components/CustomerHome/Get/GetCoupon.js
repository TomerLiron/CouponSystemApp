import CouponGeter from './CouponGeter';
import './GetCoupon.css';
import { useState } from 'react';

const GetCoupon = (props) => {
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
                <button onClick={startEditingHandler}>GetCoupon</button>
            )}
            {isEditing && (<button onClick={stopEditingHandler}>Closed </button>
            )}
            {isEditing && (<CouponGeter
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />
            )}
        </div>
    );
};
export default GetCoupon;