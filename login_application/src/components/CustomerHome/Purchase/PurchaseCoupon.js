import './PurchaseCoupon.css';
import { useRef, useState } from 'react';
import Purchase from './Purchase';
import classes from "./CreateCoupon.module.css";

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
        <div className='new-expense'>

            {!isEditing && (
                <button onClick={startEditingHandler}>Purchase</button>
            )}
            {!isEditing && (
                <div className={classes.control}>
                    <label htmlFor="id">id</label>
                    <input type="number" id="id" ref={idRef} />
                </div>
            )}
            {isEditing && (<Purchase stopEditing={stopEditingHandler} id={idRef.current.value}
            />
            )}

        </div>

    );
};
export default PurchaseCoupon;
