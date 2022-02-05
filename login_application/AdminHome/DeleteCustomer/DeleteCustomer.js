import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../../store/auth';


import { Box, Button } from '@mui/material';

const DeleteCustomer = (props) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const submitHandler = useCallback(async () => {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify(props.company.id),
    };
    try {
      const response = await fetch("/admin/deleteCustomer/", requestOptions);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }

      console.log("Response Okay!");
      if (response.status === 202) {
        window.alert(await response.text())
      } else {
        props.removeHandler(props.company.id)
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [props, token, dispatch]);
  return (
    <Box sx={{}}>
      <Button fullWidth={false} variant="outlined" size="small" onClick={submitHandler}>Delete Customer</Button>
    </Box>
  );
};
export default DeleteCustomer;