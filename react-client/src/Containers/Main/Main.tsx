import React, {useEffect, useState} from 'react';
import UserInfo from "../../Components/UserInfo/UserInfo";
import {getUserData} from "../../Services/Services";
import {Spin} from "antd";
import Spinner from "../../Components/Spinner/Spinner";

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    // useEffect(() => {
    //     if (!localStorage.getItem("userInfo")) {
    //         getUserData(setIsLoading)
    //     }
    // }, [localStorage.getItem("userInfo")]);
    return (
        <div>
            <Spinner isLoading={isLoading} />
            <UserInfo />
        </div>
    );
};

export default Main;