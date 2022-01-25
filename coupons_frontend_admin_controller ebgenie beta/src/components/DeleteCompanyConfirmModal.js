import './modal.css';
import React, { useContext } from "react";

function DeleteCompanyConfirmModal (props)
{
    const {currentCompany, deleteCompany, changeDeleteCompanyConfirmModalVisibility, setCompanyFormState} = props;

    function confirmDelete()
    {
        deleteCompany(currentCompany.id);
        setCompanyFormState("afterEdit");
        changeDeleteCompanyConfirmModalVisibility();
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-container'>
                <h1>Notification!</h1>
                <p>Are you sure you want to delete this company?</p>
                <div className='modal-buttons'>
                    <button onClick={changeDeleteCompanyConfirmModalVisibility}>Close</button>
                    <button onClick={confirmDelete}>Delete</button>
                </div>
            </div>         
        </div>
    );
}

export default DeleteCompanyConfirmModal;