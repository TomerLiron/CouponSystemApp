import './CompanyForm.css';
import React, { useState, useContext, useEffect, useReducer } from "react";

export default function CompanyForm (props)
{
   const {updateCompany, currentCompany, companyFormState, addCompany, setCompanyFormState} = props;

    const [buttonTitle, setButtonTitle] = useState("Create company");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [id, setId] = useState("");

    useEffect(() => {
       if (currentCompany.name || currentCompany.email || currentCompany.password || currentCompany.id) 
       {
            setId(currentCompany.id);
            setName(currentCompany.name);
            setEmail(currentCompany.email);
            setPassword(currentCompany.password);

            if (companyFormState == "afterEdit")
            {
                setCompanyFormState("new");
            }

            if (companyFormState == "new")
            {
                setButtonTitle("Create Company");

                setId(-1);
                setName("");
                setEmail("");
                setPassword("");                
            }

            else if (companyFormState == "edit")
                setButtonTitle("Update Company");

       }
    }, [currentCompany.id, currentCompany.name, currentCompany.email, currentCompany.password, companyFormState])

    function handleCompanyIdOnChange(event)
    {
        setId(event.target.value);
    }

    function handleCompanyNameOnChange(event) 
    {
        setName(event.target.value);
    }

    function handleCompanyEmailOnChange(event) 
    {
        setEmail(event.target.value);
    }   

    function handleCompanyPasswordOnChange(event)
    {
        setPassword(event.target.value);
    } 

    function handleOnClickResetToNew(event)
    {        
        event.preventDefault();

        setCompanyFormState("new");
    }

    function addCompanyInterior(event)
    {
        event.preventDefault();

        setCompanyFormState("afterEdit");

        addCompany(event);
    }

    
    function updateCompanyInterior(event)
    {
        event.preventDefault();

        setCompanyFormState("afterEdit");

        updateCompany(event);
    }

    return (
        <form onSubmit={companyFormState === "new" ? addCompanyInterior : updateCompanyInterior}>
            <button onClick={handleOnClickResetToNew} className="new-company__actions">New Company</button>
            {companyFormState === "edit" ? (
            <div className="new-company__controls" style={{opacity: 0, height:0}}>                
                <label htmlFor="companyId">id</label>
                <input type="text" value={id} onChange={handleCompanyIdOnChange} id="companyId" name="id"/>  
            </div>
            ) : null}
            <div className="new-company__controls">
                <label htmlFor="companyNameInput">Name</label>
                <input type="text" value={name} onChange={handleCompanyNameOnChange} id="companyNameInput" name="name" />  
            </div>
            <div className="new-company__controls">
                <label htmlFor="companyEmailInput">Email</label>
                <input type="text" value={email} onChange={handleCompanyEmailOnChange} id="companyEmailInput" name="email" />  
            </div>
            <div className="new-company__controls">
                <label htmlFor="companyPasswordInput">Password</label>
                <input type="text" value={password} onChange={handleCompanyPasswordOnChange} id="companyPasswordInput" name="password" />  
            </div>
            <button type="submit" className="new-company__actions">{buttonTitle}</button>
        </form>
    );
}