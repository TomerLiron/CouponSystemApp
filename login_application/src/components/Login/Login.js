import { useDispatch } from "react-redux";

import { UserActions } from '../../store/User';
import { authActions } from '../../store/auth';
import { useCallback, useState } from "react";

import Select from "react-select";
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("customer");

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
    onSubmit: ()=>{
      loginHandler();
    }
  });

  const loginHandler = useCallback(async () => {
    try {
      const creds = {
        email:formik.values.email,
        password: formik.values.password,
        role: selectedRole
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      };
      console.log("post: " + JSON.stringify(creds));
      const response = await fetch("/" + selectedRole + "/login", requestOptions);
      console.log("4")
      if (!response.ok) {
        window.alert("Please check your credentials!");
        localStorage.removeItem('isLoggedIn');
        dispatch(authActions.logout());
        throw new Error("Authintication fails!");
      }
      console.log("Okay!");
      const token = await response.text();
      console.log("Got token: " + token);
      dispatch(authActions.login(token));
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, selectedRole,formik.values.email,formik.values.password])

  const options = [
    { value: "admin", label: "Admin" },
    { value: "company", label: "Company" },
    { value: "customer", label: "Customer" },
  ];

  const roleChangeHandler = e => {
    if (e.value === 'company') {
      dispatch(UserActions.company());
    } else if (e.value === 'admin') {
      dispatch(UserActions.admin());
    } else if (e.value === 'customer') {
      dispatch(UserActions.customer());
    }
    console.log("selected value: " + e.value);
    setSelectedRole(e.value);
  }

  return (
    <>
      <Box>
      <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
            </Grid>
          </Grid>
        
          <Box
            sx={{
              pb: 1,
              pt: 3
            }}
          >
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
            >
              login with email address
            </Typography>
          </Box>
         <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
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
              fullWidth
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
          <Select
            id="select"
            value={options.find(obj => obj.value === selectedRole)}
            options={options}
            onChange={roleChangeHandler}
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
};

export default Login;