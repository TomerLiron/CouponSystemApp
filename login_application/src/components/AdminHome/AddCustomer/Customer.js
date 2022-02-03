import { useCallback, useRef } from 'react';
import './AddCustomer';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../../store/auth';

const Customer = (props) => {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const submitHandler = useCallback(async (event) => {
        event.preventDefault();
        console.log(categoryValue)
        const company = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", token: token },
            body: JSON.stringify(company),
        };
        try {
            console.log("company:" + JSON.stringify(company));

            const response = await fetch("/admin/addCustomer/", requestOptions);
            if (!response.ok) {
                window.alert("Session timeout!");
                // dispatch(authActions.logout());
                throw new Error("Something went wrong!");
            }

            console.log("Response Okay!");
            const id = await response.text();
            const CustomerWithId = { "id": id, ...company };
            props.onAddCustomer(CustomerWithId);
            if (response.status === 202) {
                window.alert(await response.text())
            }
        } catch (error) {
            console.log(error.message);
        }
        //setIsLoading(false);
    }, [props, token, dispatch]);
    const categoryValue = (value) => { return value }

    return (
        <form id="form" onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label htmlFor="name">First Name</label>
                    <input type="text" id="firstName" ref={firstNameRef} />
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="name">Last Name</label>
                    <input type="text" id="lastName" ref={lastNameRef} />
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="email">email</label>
                    <input type="text" id="email" ref={emailRef} />
                </div>
                <div className='new-expense__control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={passwordRef} />
                </div>
                <div className='new-expense__actions'>
                    <button onClick={submitHandler} type='submit'>Add Expense</button>
                </div>
            </div>
        </form>
    );
}

export default Customer;