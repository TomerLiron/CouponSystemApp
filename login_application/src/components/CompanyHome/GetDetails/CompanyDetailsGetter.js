import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { authActions } from '../../../store/auth';
import Details from './Details';

export default function CompanyDetailsGetter() {
  const token = useSelector(state => state.auth.token);
  const [error, setError] = useState(null)
  const [details, setDetails] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch();
  
  const handleDetails = useCallback(async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', token }
    };

    try {
      const response = await fetch("/company/getDetails", requestOptions);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setDetails(data)
      setShowDetails(true)

    } catch (error) {
      console.log(error.message)
    }
  }, [dispatch, token]);

    

  let content= <Button onClick={handleDetails}>Get Details</Button>

  if (showDetails) {
    content =
    (
      <div>
    <Details
      company={details}
      hideDetails ={()=>setShowDetails(false)}
    />
    
    </div>
    )
  }


  return <section>
    {content}
  </section>;
}
