import CouponGeter from './CompanyGeter';
// import './GetCoupon.css';
import { useState } from 'react';
import Button from '@mui/material/Button';

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
        <div className='Get-expense'>

            {!isEditing && (
                <Button  onClick={startEditingHandler}>Get Company</Button>
            )}
            {isEditing && (<Button onClick={stopEditingHandler}>Closed </Button>
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