import CouponGeter from './CouponGeter';
import { useState, useRef } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const GetCouponByCategory = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const categoryRef = useRef("FOOD");


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

            {!isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                // p: 2,
                mt: "margin-top",

            }}><Button onClick={startEditingHandler}>GetCoupon</Button>
                <div >
                    <select className="expenses-filter__select" ref={categoryRef}>
                        <option value="FOOD">FOOD</option>
                        <option value="ELECTRICITY">ELECTRICITY</option>
                        <option value="RESTAURANT">RESTAURANT</option>
                        <option value="VACATION">VACATION</option>
                        <option value="FURNITURES">FURNITURES</option>
                        <option value="HARDWARE">HARDWARE</option>

                    </select>
                </div>
            </Box>)}
            {isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                // p: 2,
                mt: "margin-top",

            }}><CouponGeter Category={categoryRef.current.value}
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
                />
                <Button pb={5} size="small" onClick={stopEditingHandler}>Closed </Button>
            </Box>)}
        </div>
    );
};
export default GetCouponByCategory;