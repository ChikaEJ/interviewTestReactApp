import React, {useEffect, useState} from 'react';
import {getUserData} from "../../Services/Services";
import {Link, Navigate, useNavigate} from "react-router-dom";

const AuthPage = () => {


    return (
        <div>
            <h1><Link to={"/main"}>Click here to discover!</Link></h1>
        </div>
    );

};

export default AuthPage;