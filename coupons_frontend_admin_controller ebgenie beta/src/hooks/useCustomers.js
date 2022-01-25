import { useCallback, useEffect, useState, useContext } from "react";

import {httpGetCustomers, httpAddCustomer, httpDeleteCustomer, httpUpdateCustomer} from "../services/api";

function useCustomers(props) 
{
  const [customers, saveCustomers] = useState([]);
  const [errorsCustomer, setErrorsCustomer] = useState("");
  
const getCustomers = useCallback(async () => 
{
  const fetchedCustomers = await httpGetCustomers();
  saveCustomers(fetchedCustomers);
}, []);

useEffect(() => 
{ 
  getCustomers();
}
, [getCustomers]
);

const addCustomer = useCallback(async (e) => 
{
    e.preventDefault();
    const data = new FormData(e.target);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    const response = await httpAddCustomer({
      firstName,
      lastName,
      email,
      password
    });

    if (response.ok) 
    {
      await getCustomers();
      setErrorsCustomer("error");
    } 
    
    else 
    {
      setErrorsCustomer("Something went wrong please try again leter");
    }
  },
  [getCustomers]
);

const updateCustomer = useCallback(async (e) => 
{
    e.preventDefault();
    const data = new FormData(e.target);
    const id = data.get("id");
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    const response = await httpUpdateCustomer(id, {firstName, lastName, email, password});

    if (response.ok) 
    {
      await getCustomers();
      setErrorsCustomer("error");
    } 
    
    else 
    {
      setErrorsCustomer("Something went wrong please try again leter");
    }
},
  [getCustomers]
);

const deleteCustomer = useCallback(async (id) => 
{
    const response = await httpDeleteCustomer(id);

    if (response.ok) 
    {
      await getCustomers();

      setErrorsCustomer("error");
    } 

    else 
    {
      setErrorsCustomer("Something went wrong please try again leter");
    }
  },
[getCustomers]
);

  return {
    customers,
    errorsCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
  };
}

export default useCustomers;
