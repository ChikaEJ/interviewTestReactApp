import React, {useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import styles from './Authorization.module.css';

const CLIENT_ID: string = "3667ac15a3e0b621d8d0";

const Authorization = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('userInfo')) navigate('/main')
    }, [localStorage.getItem('userInfo')]);
    const loginWithGitHub = async () => {
        window.location.assign(`https://github.com/login/oauth/authorize?scope=repo&client_id=${CLIENT_ID}`);
    };
    if (localStorage.getItem("accessToken")) {
        return <Navigate to={'/main'}/>
    } else {
        return (
            <div className={styles.authPage}>
                <div onClick={loginWithGitHub} className={styles.logoWrapper}>
                    <h2>Sign with</h2>
                    <img width={200} src="/images/GitHub_Logo.png" alt="GitHub_Logo"/>
                </div>
            </div>
        );
    };
};

export default Authorization;