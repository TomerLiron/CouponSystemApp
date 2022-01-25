import './Company.css';
import Wrapper from './Wrapper';
import React, { useState, useContext } from "react";

export default function Customer(props)
{
    const {id, firstName, lastName, email, password} = props.customer;    

    const {setCustomerFormState, changeDeleteCustomerConfirmModalVisibility} = props;

    const setCurrentCustomer = props.setCurrentCustomer;

    function handleOnClickEdit (event)
    {
        event.preventDefault();

        setCustomerFormState("edit");
        
        setCurrentCustomer({id, firstName, lastName, email, password});
    }

    function handleOnClickDelete (event)
    {
        event.preventDefault();
        setCurrentCustomer({id, firstName, lastName, email, password});
        changeDeleteCustomerConfirmModalVisibility();        
    }

    return (
        <Wrapper className="company-item">          
            <h2>{firstName}</h2>
            <h2>{lastName}</h2>
            <p>{email}</p>                       
            <button onClick={handleOnClickEdit}>Edit</button>
            <button onClick={handleOnClickDelete}>Delete</button>
        </Wrapper>
    );
}