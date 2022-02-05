import { useRef, useState } from 'react';
import Purchase from './Purchase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const PurchaseCoupon = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const idRef = useRef("");

    const startEditingHandler = () => {
        console.log(idRef.current.value)

        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        console.log('3');
        setIsEditing(false);
    };
    return (
        <div >

            {!isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                mt: "margin-top",
            }}>
                <Button onClick={startEditingHandler}>Purchase Coupon</Button>
                <div>
                    <label htmlFor="id">id</label>
                    <input type="number" id="id" ref={idRef} />
                </div>
            </Box>)}

            {isEditing && (<Box sx={{
                m: 1,
                boxShadow: 5,
                borderRadius: 2,
                mt: "margin-top",
            }}>
                <Purchase stopEditing={stopEditingHandler} id={idRef.current.value}
                />
            </Box>)}

        </div>

    );
};
export default PurchaseCoupon;
