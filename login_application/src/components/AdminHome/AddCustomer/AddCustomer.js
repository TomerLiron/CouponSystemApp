import Customer from './Customer';
import { useState } from 'react';
import Button from '@mui/material/Button';


const AddCustomer = (props) => {
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
        <div >
            {!isEditing && (
                <Button onClick={startEditingHandler}>Add Customer</Button>
            )}
            {isEditing && (<Customer stopEditingHandler={stopEditingHandler}
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={stopEditingHandler}
                />
               
            )}
        </div>
    );
};
export default AddCustomer;