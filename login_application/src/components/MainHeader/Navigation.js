import { useSelector, useDispatch } from 'react-redux';

import classes from './Navigation.module.css';
import { loginActions } from '../../store/login';
import { UserActions } from '../../store/User';

const Navigation = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin);
    const User = useSelector((state) => state.User.User);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        dispatch(loginActions.logout());
    };

    const companyHandler = () => {
        console.log(User);
        localStorage.setItem('user', '1');
        dispatch(UserActions.company());
    };
    const customerHandler = () => {
        console.log(User);
        localStorage.setItem('user', '2');
        dispatch(UserActions.customer());
    };
    const adminHandler = () => {
        console.log(User);
        localStorage.setItem('user', '3');
        dispatch(UserActions.admin());
    };


    return (
        <nav className={classes.nav}>
            <ul>
                {isLogin && (
                    <li>
                        <a href="/">Users</a>
                    </li>
                )}
                {isLogin && (
                    <li>
                        <a href="/">{User}</a>
                    </li>
                )}
                {isLogin && (
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                )}
                {!isLogin && (
                    <li>
                        <button onClick={companyHandler}>Company</button>
                    </li>
                )}
                {!isLogin && (
                    <li>
                        <button onClick={adminHandler}>Admin</button>
                    </li>
                )}
                {!isLogin && (
                    <li>
                        <button onClick={customerHandler}>Customer</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
