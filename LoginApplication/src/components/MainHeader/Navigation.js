import { useSelector, useDispatch } from 'react-redux';

import classes from './Navigation.module.css';
import { loginActions } from '../../store/login';
import { UserActions } from '../../store/User';

const Navigation = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin);
    const User = useSelector((state) => state.User.User);

    const logoutHandler = () => {
        dispatch(loginActions.logout());
    };

    const companyHandler = () => {
        console.log(User);
        dispatch(UserActions.company());
    };
    const adminHandler = () => {
        console.log(User);
        dispatch(UserActions.admin());
    };
    const customerHandler = () => {
        console.log(User);
        dispatch(UserActions.customer());
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
