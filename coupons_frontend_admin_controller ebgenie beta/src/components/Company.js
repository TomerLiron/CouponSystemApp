import './Company.css';
import Wrapper from './Wrapper';
import React, { useState, useContext } from "react";

export default function Company(props)
{
    const {id, name, email, password} = props.company;    

    const {setCompanyFormState, changeDeleteCompanyConfirmModalVisibility} = props;

    const setCurrentCompany = props.setCurrentCompany;

    function handleOnClickEdit (event)
    {
        event.preventDefault();

        setCompanyFormState("edit");
        
        setCurrentCompany({id, name, email, password});
    }

    function handleOnClickDelete (event)
    {
        event.preventDefault();
        setCurrentCompany({id, name, email, password});
        changeDeleteCompanyConfirmModalVisibility();        
    }

    return (
        <Wrapper className="company-item">          
            <h2>{name}</h2>
            <p>{email}</p>                       
            <button onClick={handleOnClickEdit}>Edit</button>
            <button onClick={handleOnClickDelete}>Delete</button>
        </Wrapper>
    );
}