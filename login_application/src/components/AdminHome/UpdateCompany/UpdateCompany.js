import Company from './Company';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const UpdateCompany = (props) => {
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
            {isEditing && (<Company oldCompany={props.company} updateFieldChanged={props.updateFieldChanged}
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />

            )}
        </Box>
    );
};
export default UpdateCompany;