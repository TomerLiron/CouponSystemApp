import './Coupon.css';
import { useState, useCallback } from 'react';
import Category from "./Category";

const Coupon = (props) => {

    const [userInput, setUserInput] = useState({
        enteredTitle: '',
        enteredDescription: '',
        enteredAmount: '',
        enteredStartDate: '',
        enteredEndDate: '',
        enteredPrice:'',
        enteredImage:''

    });

    const [filteredYear, setFilteredYear] = useState("FOOD");

    const onYearChangeHandler = (year) => {
        setFilteredYear(year);
    };


    const submitHandler = (event) => {
        event.preventDefault();
        const result = {
            id: Math.random() + '',
            title: userInput.enteredTitle,
            Description: userInput.enteredDescription,
            amount: Number(userInput.enteredAmount),
            startDate: new Date(userInput.enteredStartDate),
            endDate: new Date(userInput.enteredEndDate),
            price:Number(userInput.enteredprice),
            image: userInput.enteredImage,

        }

        props.onSaveExpenseData(result);
        setUserInput({
            enteredTitle: '',
            enteredAmount: '',
            enteredDate: ''
        });
    }
    const imageChangeHandler = (event) => {
        setUserInput((oldUserInput) => {
            let newUserInput = { ...oldUserInput, enteredImage: event.target.value };
            return newUserInput;
        });
    }
    const titleChangeHandler = (event) => {
        setUserInput((oldUserInput) => {
            let newUserInput = { ...oldUserInput, enteredTitle: event.target.value };
            return newUserInput;
        });
    }


    const DescriptionChangeHandler = (event) => {
        setUserInput((oldUserInput) => {
            let newUserInput = { ...oldUserInput, enteredDescription: event.target.value };
            return newUserInput;
        });
    }

    const dateStartChangeHandler = (event) => {
        setUserInput((oldUserInput) => {
            let newUserInput = { ...oldUserInput, enteredStartDate: event.target.value };
            return newUserInput;
        });
    }
    const dateEndChangeHandler = (event) => {
        setUserInput((oldUserInput) => {
            let newUserInput = { ...oldUserInput, enteredEndDate: event.target.value };
            return newUserInput;
        });
    }
    const amountChangeHandler = (event) => {
        setUserInput((oldUserInput) => {
            let newUserInput = { ...oldUserInput, enteredAmount: event.target.value };
            return newUserInput;
        });
    }
    const priceChangeHandler = (event) => {
        setUserInput((oldUserInput) => {
            let newUserInput = { ...oldUserInput, enteredPrice: event.target.value };
            return newUserInput;
        });
    }

    /////////////////////////////////////////////////////////
    const fetchLoggedInHandler = useCallback(async () => {
        // setIsLoading(true);
        // setError(null);
        try {
            console.log(filteredYear)
            const response = await fetch('company/add?category=' + filteredYear + '&title=' + userInput.enteredTitle + '&description=' + userInput.enteredDescription + '&amount=' + userInput.enteredAmount + '&startDate=' + userInput.enteredStartDate + '&endDate=' + userInput.enteredEndDate+'&price='+userInput.enteredPrice+'&image='+userInput.enteredImage)
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
    }, [userInput, filteredYear]);
    //,amountChangeHandler.value,dateChangeHandler.value

    ////////////////////////////////////////////////////

    return (
        <form id="form" onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>מוצר</label>
                    <input type="text" value={userInput.enteredTitle} onChange={titleChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>תיאור</label>
                    <input type="text" value={userInput.enteredDescription} onChange={DescriptionChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>מחיר</label>
                    <input type="number" min='1' step='0.1' value={userInput.enteredPrice} onChange={priceChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>כמות</label>
                    <input type="number" min='1' step='1' value={userInput.enteredAmount} onChange={amountChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>התאריך התחלה</label>
                    <input type="date" min='2019.01.01' max='2022.01.01' value={userInput.enteredStartDate} onChange={dateStartChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>תאריך</label>
                    <input type="date" min='2019.01.01' max='2022.01.01' value={userInput.enteredEndDate} onChange={dateEndChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>תמונה</label>
                    <input type="text" value={userInput.enteredImage} onChange={imageChangeHandler} />
                </div>
                <Category onYearChange={onYearChangeHandler} />
                <div className='new-expense__actions'>
                    <button onClick={fetchLoggedInHandler} type='submit'>Add Expense</button>
                </div>
                
            </div>

        </form>



    );

}

export default Coupon;