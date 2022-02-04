import UpdateCoupon from './UpdateCoupon';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const UpdateCouponSelector = (props) => {
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
        <Box sx={{ }}>
            {!isEditing && (
                <Button fullWidth={false} variant="outlined" size="small" onClick={startEditingHandler}>Update Company</Button>
            )}
            {isEditing && (<UpdateCoupon coupon={props.coupon} updateFieldChanged={props.updateFieldChanged}
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />

            )}
        </Box>
    );
};
export default UpdateCouponSelector;