import Company from './Company';
import { useState } from 'react';
import Button from '@mui/material/Button';


const AddCompany = (props) => {
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
        <div >
            {!isEditing && (
                <Button onClick={startEditingHandler}>Add Company</Button>
            )}
            {isEditing && (<Company
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={stopEditingHandler}
                />
               
            )}
        </div>
    );
};
export default AddCompany;