import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Authorization.module.css';
import {getUserData} from "../../Services/Services";
import Spinner from "../../UIComponents/Spinner/Spinner";
import {AuthContext} from "../../Contex/AuthContext";

const CLIENT_ID: string = "3667ac15a3e0b621d8d0";

const Authorization = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const {token, updateValue} = useContext(AuthContext);
    useEffect(() => {
        if (!token) {
            const getAccessToken = async () => {
                const queryString: string = window.location.search;
                const urlParams: URLSearchParams = new URLSearchParams(queryString);
                const codeParams: string | null = urlParams.get('code');
                try {
                    setIsLoading(true)
                    const url = `http://localhost:4000/getAccessToken?code=${codeParams}`
                    const response = await fetch(url, {
                        method: "GET"
                    });
                    const data: { access_token: string } = await response.json();
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        await getUserData(data.access_token);
                        updateValue(data.access_token)
                    }
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false)
                    console.error(error);
                }
            }
            getAccessToken();
        }
    }, []);
    const loginWithGitHub = async () => {
        window.location.assign(`https://github.com/login/oauth/authorize?scope=repo&client_id=${CLIENT_ID}`);
    };
    useEffect(() => {
        if (token){
            navigate('main')
        }
    }, [token]);

    return (
        <div className={styles.authPage}>
            <Spinner isLoading={isLoading}/>
            <div onClick={loginWithGitHub} className={styles.logoWrapper}>
                <h2>Sign with</h2>
                <img width={200} src="/images/GitHub_Logo.png" alt="GitHub_Logo"/>
            </div>
        </div>
    );
};

export default Authorization;