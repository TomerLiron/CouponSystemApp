import Customer from './Customer';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const UpdateCustomer = (props) => {
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
                <Button fullWidth={false} variant="outlined" size="small" onClick={startEditingHandler}>Update Customer</Button>
            )}
            {isEditing && (<Customer oldCustomer={props.company} updateFieldChanged={props.updateFieldChanged} stopEditingHandler={stopEditingHandler}
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />

            )}
        </Box>
    );
};
export default UpdateCustomer;