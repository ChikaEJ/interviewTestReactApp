import './App.css';
import Authorization from "./Containers/Authorization/Authorization";
import {Route, Routes} from "react-router-dom";
import Main from "./Containers/Main/Main";
import Header from "./Components/Header/Header";
import Projects from "./Containers/Projects/Projects";
import React, {useContext} from "react";
import OtherUsers from "./Containers/OtherUsers/OtherUsers";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/Footer/Footer";
import {AuthContext} from "./Contex/AuthContext";


function App() {
    let isLogin: boolean = false;
    const {token} = useContext(AuthContext);
    if (token) isLogin = true;

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/main" element={
                    <ProtectedRoute isAllowed={isLogin} redirectPath={"/"}>
                        <Main/>
                    </ProtectedRoute>
                }/>
                <Route path="/projects" element={
                    <ProtectedRoute isAllowed={isLogin} redirectPath={"/"}>
                        <Projects/>
                    </ProtectedRoute>}/>
                <Route path="/other_users" element={
                    <ProtectedRoute isAllowed={isLogin} redirectPath={"/"}>
                        <OtherUsers/>
                    </ProtectedRoute>}/>
                <Route path="/" element={<Authorization/>}/>
                <Route path="*" element={<p>There's nothing here: 404!</p>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
