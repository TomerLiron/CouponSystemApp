import './Delete.css';
import { useState, useCallback } from 'react';

const Delete = (props) => {

    const [userInput, setUserInput] = useState({

        enteredId: '',
    });

    const submitHandler = (event) => {
        event.preventDefault();
        const result = {
            Id: Number(userInput.enteredId),
        }

        props.onSaveExpenseData(result);
        setUserInput({
            enteredId: '',
        });
    }

    const IdChangeHandler = (event) => {
        setUserInput((oldUserInput) => {
            let newUserInput = { ...oldUserInput, enteredId: event.target.value };
            return newUserInput;
        });
    }

    /////////////////////////////////////////////////////////
    const fetchLoggedInHandler = useCallback(async () => {
        // setIsLoading(true);
        // setError(null);
        try {
            console.log("th")
            const response = await fetch('company/delete?id=' + userInput.enteredId)
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            data.map((couponsData) => {

                return {}
            });
        } catch (error) {
            // setError(error.message);
        }
    }, [userInput ]);
    //,amountChangeHandler.value,dateChangeHandler.value

    ////////////////////////////////////////////////////

    return (
        <form id="form" onSubmit={submitHandler}>
            <div className='new-expense__controls'>
            <div className='new-expense__control'>
                    <label>כמות</label>
                    <input type="number" min='1' step='1' value={userInput.enteredId} onChange={IdChangeHandler} />
                </div>
                <div className='new-expense__actions'>
                    <button onClick={fetchLoggedInHandler} type='submit'>Delete Coupon</button>
                </div>

            </div>

        </form>



    );

}

export default Delete;