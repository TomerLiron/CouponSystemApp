import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../UI/Button/Button';
import Details from './Details';

export default function CompanyDetailsGetter() {
  const token = useSelector(state => state.auth.token);
  const [error, setError] = useState(null)
  const [details, setDetails] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  
  const handleDetails = useCallback(async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', token }
    };

    try {
      const response = await fetch("/company/getDetails", requestOptions);
      if (!response.ok) {
        window.alert("Session timeout!");
        //dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }

      console.log("Response Okay!");
      const data = await response.json();
      console.log(data)

      setDetails(data)
      console.log(details)
      setShowDetails(true)

     

    } catch (error) {
      setError(error.message);
    }


  }, [details, token]);

    

  let content= <Button onClick={handleDetails}>Get Details</Button>

  if (showDetails) {
    content =
    (<Details
      company={details}
    />)
  }


  return <section>
    {content}
  </section>;
}
