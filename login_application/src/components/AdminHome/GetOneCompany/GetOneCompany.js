import CompanyGeter from './CompanyGeter'
import { useState,useRef } from 'react';
import Button from '@mui/material/Button';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Container, TextField } from '@mui/material';

const GetOneCompany = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const idRef = useRef("");

    const saveExpenseDataHandler = (enteredExpenseData) => {
        setIsEditing(false);
    };

    const startEditingHandler = () => {
        console.log("ref "+idRef.current.value)

        setIsEditing(true);
    };
    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return (
        <div className='Get-expense'>

            {!isEditing && (
                <Button onClick={startEditingHandler}>Get One Company </Button>
            )}
            {!isEditing && (
                <form >
{/* //onSubmit={formik.handleSubmit} */}
                    <TextField
                    inputRef={idRef}
                        // error={Boolean(formik.touched.id && formik.errors.id)}
                        // fullWidth
                        // helperText={formik.touched.id && formik.errors.id}
                        label="Email Address"
                        margin="normal"
                        name="id"
                        // onBlur={formik.handleBlur}
                        // onChange={formik.handleChange}
                        type="number"
                        // value={formik.values.id}
                        variant="outlined"
                    />;
                </form>
            )}
            {isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                // p: 2,
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