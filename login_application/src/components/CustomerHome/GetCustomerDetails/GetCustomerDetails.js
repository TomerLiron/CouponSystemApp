import CouponGeter from './DetailsGeter';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const GetCustomerDetails = (props) => {
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
                <Button onClick={startEditingHandler}>GetCoupon</Button>
            )}
            {isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                mt: "margin-top",

            }}><Button onClick={stopEditingHandler}>Closed </Button>
            <CouponGeter
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />
            </Box>)}
        </div>
    );
};
export default GetCustomerDetails;