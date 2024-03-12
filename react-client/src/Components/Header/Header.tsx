import styles from './Header.module.css';

import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.clear();
        navigate('/');
    }
    return (
        <nav >
            <div className={"container " + styles.nav}>
                <a href="http://localhost:3000">
                    <div className={styles.navLogo}><img src="/images/githubL.png" alt="gitlubLogo"/></div>
                </a>
                {
                    localStorage.getItem("accessToken")
                        ?
                        <ul className={styles.nav_list}>
                            <li><Link to="/main">Home</Link></li>
                            <li><Link to="/projects">My Projects</Link></li>
                            <li><Link to="/other_users">Other Users</Link></li>
                            <li><button onClick={signOut}>Sign out</button></li>
                        </ul>
                        :
                        <ul className={styles.nav_list}>
                            <li><Link to="/">Sign In</Link></li>
                        </ul>
                }
            </div>

        </nav>
    );
};

export default Header;