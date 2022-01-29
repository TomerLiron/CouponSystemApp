import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../../../store/auth';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const Company = (props) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      submitHandler();
    }
  });

  const submitHandler = useCallback(async () => {

    const company = {
      id: JSON.stringify(props.oldCompany.id),
      name: props.oldCompany.name,
      email: formik.values.email,
      password: formik.values.password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify(company),
    };
    try {
      const response = await fetch("/admin/updateCompany/", requestOptions);
      if (!response.ok) {
        window.alert("Session timeout!");
        dispatch(authActions.logout());
        throw new Error("Something went wrong!");
      }

      console.log("Response Okay!");
      if (response.status === 202) {
        window.alert(await response.text())
      } else {
        { props.updateFieldChanged(company) }
      }
    } catch (error) {
      console.log(error.message);
    }
    //setIsLoading(false);
  }, [props, token, dispatch, formik.values.email, formik.values.password]);
  const categoryValue = (value) => { return value }

  return (
    <>
      <Box
        sx={{
          // width: 1 / 4,
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        <form onSubmit={formik.handleSubmit}>

          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            // fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            // fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In Now
            </Button>
          </Box>

        </form>
      </Box>
    </>
  );
}

export default Company;