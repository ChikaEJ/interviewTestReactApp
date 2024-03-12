import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {getUserData} from "../../Services/Services";

const AuthPage = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(true)

    useEffect(() => {

        if (!accessToken) {
            const getAccessToken = async () => {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const codeParams = urlParams.get('code');
                try {
                    const url = `http://localhost:4000/getAccessToken?code=${codeParams}`
                    const response = await fetch(url, {
                        method: "GET"
                    });
                    const data: { access_token: string } = await response.json();
                    console.log(data)
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        await getUserData(setIsLoading, data.access_token);
                        setAccessToken(data.access_token);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            getAccessToken();
        }
    }, []);

    return (
        <div>
            <h1>Auth page</h1>
        </div>
    );

};

export default AuthPage;