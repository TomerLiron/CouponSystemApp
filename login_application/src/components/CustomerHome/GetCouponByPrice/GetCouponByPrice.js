import CouponGeter from './CouponGeter';
import { useState, useRef } from 'react';
// import Button from '@mui/material/Button';
import { Box, TextField,Button } from '@mui/material';

const GetCouponByPrice = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const priceRef = useRef("");
    const saveExpenseDataHandler = (enteredExpenseData) => {
        setIsEditing(false);
    };

    const startEditingHandler = () => {
        // console.log(priceRef.current.value)
        setIsEditing(true);
    };
    const stopEditingHandler = () => {
        setIsEditing(false);
    };
    return (
        <div>

            {!isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                mt: "margin-top",

            }}>
                <Button onClick={startEditingHandler}>GetCoupon</Button>
                <form >
                    <TextField
                    inputRef={priceRef}
                        label="price"
                        margin="normal"
                        name="price"
                        type="number"
                        variant="outlined"
                    />;
                </form>
                {/* <div>
                    <label htmlFor="price">price</label>
                    <input type="number" step={0.01} id="price" ref={priceRef} />
                </div> */}
            </Box>)}
            {isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                mt: "margin-top",
            }}>
                <Button onClick={stopEditingHandler}>Closed </Button>
                <CouponGeter price={priceRef.current.value}
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
            />
            </Box>)}
           
        </div>
    );
};
export default GetCouponByPrice;