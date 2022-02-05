import CouponGeter from './CouponGeter';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
        <div>

            {!isEditing && (
                <Button onClick={startEditingHandler}>Get Coupons</Button>
            )}
            {isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                // p: 2,
                mt: "margin-top",

            }}><CouponGeter
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={stopEditingHandler}
                />
                <Button pb={5} size="small" onClick={stopEditingHandler}>Closed </Button>
            </Box>)}
        </div>
    );
};
export default GetCoupon;
