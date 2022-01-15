import CouponGeter from './CouponGeter';
import './GetCoupon.css';
import { useState } from 'react';

const GetCoupon = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const saveExpenseDataHandler = (enteredExpenseData) => {
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
                <button onClick={startEditingHandler}>GetCoupon</button>
            )}
            {isEditing && (<button onClick={stopEditingHandler}>Closed </button>
            )}
            {isEditing && (<CouponGeter
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />
                //<button onClick={stopEditingHandler}>st</button>&&
            )}
        </div>
    );
};
export default GetCoupon;