import Company from './Company';
// import './UpdateCompany.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const UpdateCompany = (props) => {
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
        <Box sx={{ '& button': { m: 1 } }}>
            {!isEditing && (
                <Button variant="outlined" size="large" onClick={startEditingHandler}>Update Company</Button>
            )}
            {isEditing && (<Company
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />

            )}
        </Box>
    );
};
export default UpdateCompany;