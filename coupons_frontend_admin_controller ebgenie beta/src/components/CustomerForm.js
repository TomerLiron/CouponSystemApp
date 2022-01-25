import './CompanyForm.css';
import React, { useState, useContext, useEffect, useReducer } from "react";

export default function CustomerForm (props)
{
   const {updateCustomer, currentCustomer, customerFormState, addCustomer, setCustomerFormState, customers} = props;

    const [buttonTitle, setButtonTitle] = useState("Create customer");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [id, setId] = useState("");

    useEffect(() => {
       if (currentCustomer.firstName || currentCustomer.lastName || currentCustomer.email || currentCustomer.password || currentCustomer.id) 
       {
            setId(currentCustomer.id);
            setFirstName(currentCustomer.firstName);
            setLastName(currentCustomer.lastName);
            setEmail(currentCustomer.email);
            setPassword(currentCustomer.password);

            if (customerFormState == "afterEdit")
            {
                setCustomerFormState("new");
            }

            if (customerFormState == "new")
            {
                setButtonTitle("Create Customer");

                setId(-1);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");                
            }

            else if (currentCustomer == "edit")
                setButtonTitle("Update Customer");

       }
    }, [currentCustomer.id, currentCustomer.firstName, currentCustomer.lastName, currentCustomer.email, currentCustomer.password,
        customerFormState])

    function handleCustomerIdOnChange(event)
    {
        setId(event.target.value);
    }

    function handleCustomerFirstNameOnChange(event) 
    {
        setFirstName(event.target.value);
    }

    function handleCustomerLastNameOnChange(event) 
    {
        setLastName(event.target.value);
    }

    function handleCustomerEmailOnChange(event) 
    {
        setEmail(event.target.value);
    }   

    function handleCustomerPasswordOnChange(event)
    {
        setPassword(event.target.value);
    } 

    function handleOnClickResetToNew(event)
    {        
        event.preventDefault();

        setCustomerFormState("new");
    }

    function addCustomerInterior(event)
    {
        event.preventDefault();

        setCustomerFormState("afterEdit");

        addCustomer(event);
    }

    
    function updateCustomerInterior(event)
    {
        event.preventDefault();

        setCustomerFormState("afterEdit");

        updateCustomer(event);
    }

    return (
        <form onSubmit={customerFormState === "new" ? addCustomerInterior : updateCustomerInterior}>
            <button onClick={handleOnClickResetToNew} className="new-company__actions">New Customer</button>
            {customerFormState === "edit" ? (
            <div className="new-company__controls" style={{opacity: 0, height:0}}>                
                <label htmlFor="customerId">id</label>
                <input type="text" value={id} onChange={handleCustomerIdOnChange} id="customerId" name="id"/>  
            </div>
            ) : null}
            <div className="new-company__controls">
                <label htmlFor="customerFirstNameInput">First Name</label>
                <input type="text" value={firstName} onChange={handleCustomerFirstNameOnChange} id="customerFirstNameInput" name="firstName" />  
            </div>
            <div className="new-company__controls">
                <label htmlFor="customerLastNameInput">Last Name</label>
                <input type="text" value={lastName} onChange={handleCustomerLastNameOnChange} id="customerLastNameInput" name="lastName" />  
            </div>
            <div className="new-company__controls">
                <label htmlFor="customerEmailInput">Email</label>
                <input type="text" value={email} onChange={handleCustomerEmailOnChange} id="customerEmailInput" name="email" />  
            </div>
            <div className="new-company__controls">
                <label htmlFor="customerPasswordInput">Password</label>
                <input type="text" value={password} onChange={handleCustomerPasswordOnChange} id="customerPasswordInput" name="password" />  
            </div>
            <button type="submit" className="new-company__actions">{buttonTitle}</button>
        </form>
    );
}