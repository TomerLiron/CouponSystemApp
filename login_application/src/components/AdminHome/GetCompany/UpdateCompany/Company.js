import { useCallback, useRef } from 'react';
import './UpdateCompany';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../../../store/auth';

const Company = (props) => {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const submitHandler = useCallback(async (event) => {
        event.preventDefault();
        console.log(categoryValue)
        const company = {
            id: JSON.stringify(props.oldCompany.id),
            name: props.oldCompany.name,
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
            // props.Company= JSON.stringify(props.oldCompany);
            const response = await fetch("/admin/updateCompany/", requestOptions);
            if (!response.ok) {
                window.alert("Session timeout!");
                dispatch(authActions.logout());
                throw new Error("Something went wrong!");
            }

            console.log("Response Okay!");
            const id = await response.text();
            const cuponWithId = { "id": id, ...company };
            // props.onAddCoupon(cuponWithId);
            if (response.status === 202) {
                window.alert(await response.text())
            } else {
                { props.updateFieldChanged(company) }
            }
        } catch (error) {
            console.log(error.message);
        }
        //setIsLoading(false);
    }, [props, token, dispatch]);
    const categoryValue = (value) => { return value }

    return (
        <form id="form" onSubmit={submitHandler}>
            <div className='update-expense__controls'>
                {/* <div className='update-expense__control'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" ref={nameRef} />
                </div> */}
                <div className='update-expense__control'>
                    <label htmlFor="email">email</label>
                    <input type="text" id="email" ref={emailRef} />
                </div>
                <div className='update-expense__control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={passwordRef} />
                </div>
                <div className='update-expense__actions'>
                    <button onClick={submitHandler} type='submit'>Add Expense</button>
                </div>
            </div>
        </form>
    );
}

export default Company;