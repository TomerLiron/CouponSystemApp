import { useSelector, useDispatch } from 'react-redux';

import classes from './Navigation.module.css';
// import { loginActions } from '../../store/login';
import { UserActions } from '../../store/User';
import { authActions } from '../../store/auth';

const Navigation = () => {
    const dispatch = useDispatch();
    // const isLogin = useSelector((state) => state.login.isLogin);
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const User = useSelector((state) => state.User.User);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        dispatch(authActions.logout());
    };

    return (
        <nav className={classes.nav}>
            <ul>
                {isAuth && (
                    <li>
                        
                        <a href="/">Users</a>
                    </li>
                )}
                {isAuth && (
                    <li>
                        <a href="/">{User}</a>
                    </li>
                )}
                {isAuth && (
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
