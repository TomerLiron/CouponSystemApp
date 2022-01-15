import { useDispatch } from "react-redux";

import classes from './Login.module.css';
import { UserActions } from '../../store/User';
import { authActions } from '../../store/auth';
import { useCallback, useRef, useState } from "react";
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

import Select from "react-select";

const CustomerLogin = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [selectedRole, setSelectedRole] = useState(null);

  const dispatch = useDispatch();

  const options = [
    { value: "admin", label: "Admin" },
    { value: "company", label: "Company" },
    { value: "customer", label: "Customer" },
  ];

  const loginHandler = useCallback(async (event) => {
    try {
      console.log("loge");
      event.preventDefault();

      const creds = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        role: selectedRole
      };

      // POST request using fetch inside useEffect React hook
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      };

      console.log("post: " + JSON.stringify(creds));
      const response = await fetch("/customer/login", requestOptions);
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
  }, [dispatch, selectedRole]);

  const roleChangeHandler = e => {
    if (e.value === 'company') {
      dispatch(UserActions.company());
    }else if (e.value==='admin'){
      dispatch(UserActions.admin());
    }
    console.log("selected value: " + e.value);
    setSelectedRole(e.value);
  }

  return (
    <Card className={classes.login}>
      <div>CustomerLogin</div>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordRef} minLength="6" maxLength="14"/>
          </div>
          <div className={classes.control}>
            <label htmlFor="select">Role</label>
            <Select
              id="select"
              value={options.find(obj => obj.value === selectedRole)}
              options={options}
              onChange={roleChangeHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn}>Login</Button>
          </div>
        </form>
      </section>
    </Card>
  );
};

export default CustomerLogin;
