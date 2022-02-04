import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../../store/auth';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, TextField } from '@mui/material';

const UpdateCoupon = (props) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
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

  const submitHandler = useCallback(async (event) => {
    event.preventDefault();
    console.log(formik.values.title)
    const company = {
      id: props.coupon.id,
      company: props.coupon.id,
      category: props.coupon.category,
      title: props.coupon.title,
      description: props.coupon.description,
      amount: props.coupon.amount,
      startDate: props.coupon.startDate,
      endDate: props.coupon.endDate,
      price: props.coupon.price,
      image: props.coupon.image,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify(company),
    };
    try {
      // console.log("!2")
      // const response = await fetch("/admin/updateCustomer/", requestOptions);
      // if (!response.ok) {
      //   window.alert("Session timeout!");
      //   dispatch(authActions.logout());
      //   throw new Error("Something went wrong!");
      // }

      console.log("Response Okay!");
      // if (response.status === 202) {
      //   window.alert(await response.text())
      // } else {
      //   props.updateFieldChanged(company)
      // }
    } catch (error) {
      console.log(error.message);
    }
  }, [token, dispatch, props, formik.values]);

  return (
    <Box
      // component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={formik.handleSubmit}>

        <TextField
          error={Boolean(formik.touched.title && formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          label="title"
          name="title"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.title}
          id="outlined-error"
        // defaultValue="Hello World"
        />
        {/* <TextField
          error
          id="outlined-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        />
      </div>
      <div>
        <TextField
          error
          id="filled-error"
          label="Error"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          error
          id="filled-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
          variant="filled"
        />
      </div>
      <div>
        <TextField
          error
          id="standard-error"
          label="Error"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
          variant="standard"
        /> */}
        <Button
          color="primary"
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        // onClick={formik.handleSubmit}
        >
          update
        </Button>
      </form>
    </Box>

  );
}

export default UpdateCoupon;