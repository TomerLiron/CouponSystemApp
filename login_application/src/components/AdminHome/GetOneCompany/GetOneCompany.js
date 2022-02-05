import CompanyGeter from './CompanyGeter'
import { useState, useRef } from 'react';
import Button from '@mui/material/Button';


import { Box, TextField } from '@mui/material';

const GetOneCompany = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const idRef = useRef("");
    const [btnDisabled, setBtnDisabled] = useState(true)
    const saveExpenseDataHandler = (enteredExpenseData) => {
        setIsEditing(false);
    };

    const startEditingHandler = () => {
        console.log("ref " + idRef.current.value)

        setIsEditing(true);
    };
    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return (
        <div className='Get-expense'>

            {!isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                mt: "margin-top",


            }}>
                <form >
                    <TextField
                        inputRef={idRef}
                        label="Id"
                        margin="normal"
                        name="id"
                        type="number"
                        variant="outlined"
                        onChange={(text) => setBtnDisabled(!text.target.value)}
                    />;
                    <Button disabled={btnDisabled} onClick={startEditingHandler}>Get One Company </Button>

                </form>
            </Box>)}
            {isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                mt: "margin-top",
            }}>
                <CompanyGeter id={idRef.current.value}
                    onSaveExpenseData={saveExpenseDataHandler}
                    onCancel={stopEditingHandler}
                />
                <Button pb={5} size="small" onClick={stopEditingHandler}>Closed </Button>
            </Box>)}
        </div>
    );
};
export default GetOneCompany;