import Coupon from './Coupon';
import './AddCoupon.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
const AddCoupon = (props) => {
    const [isEditing, setIsEditing] = useState(false);


    const startEditingHandler = () => {
        setIsEditing(true);
    };
    const stopEditingHandler = () => {
        setIsEditing(false);
        
    };
    return (
        <div >
            {!isEditing && (
                <Button onClick={startEditingHandler}>Add Coupon</Button>
            )}
            {isEditing && (<Coupon 
                    onStopEditing ={stopEditingHandler}
                    onAddCoupon={props.onAddCoupon}
                />
               
            )}
        </div>
    );
};
export default AddCoupon;