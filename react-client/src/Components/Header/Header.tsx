import styles from './Header.module.css';

import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../Contex/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const {token, updateValue} = useContext(AuthContext);
    const signOut = () => {
        localStorage.clear();
        updateValue('');
        navigate('/');
    }
    return (
        <nav >
            <div className={"container " + styles.nav}>
                <a href="http://localhost:3000">
                    <div className={styles.navLogo}><img src="/images/githubL.png" alt="gitlubLogo"/></div>
                </a>
                {
                    token
                        ?
                        <ul className={styles.nav_list}>
                            <li><Link to="/main">Home</Link></li>
                            <li><Link to="/projects">My Projects</Link></li>
                            <li><Link to="/other_users">Other Users</Link></li>
                            <li><button onClick={signOut}>Sign out</button></li>
                        </ul>
                        :
                        <ul className={styles.nav_list}>
                            <li><a href="http://localhost:3000">Sign in</a></li>
                        </ul>
                }
            </div>

        </nav>
    );
};

export default Header;