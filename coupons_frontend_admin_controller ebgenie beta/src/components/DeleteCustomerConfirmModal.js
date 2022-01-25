import './modal.css';
import React, { useContext } from "react";

function DeleteCustomerConfirmModal (props)
{
    const {currentCustomer, deleteCustomer, changeDeleteCustomerConfirmModalVisibility, setCustomerFormState} = props;

    function confirmDelete()
    {
        deleteCustomer(currentCustomer.id);
        setCustomerFormState("afterEdit");
        changeDeleteCustomerConfirmModalVisibility();
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-container'>
                <h1>Notification!</h1>
                <p>Are you sure you want to delete this customer?</p>
                <div className='modal-buttons'>
                    <button onClick={changeDeleteCustomerConfirmModalVisibility}>Close</button>
                    <button onClick={confirmDelete}>Delete</button>
                </div>
            </div>         
        </div>
    );
}

export default DeleteCustomerConfirmModal;