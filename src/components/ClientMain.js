import React, {useState} from "react";
import {ADMIN_TOKEN_KEY} from "../Constants";
import Base from "./adminComponents/base";
import AdminLogin from "./adminComponents/AdminLogin";

function ClientHome() {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem(ADMIN_TOKEN_KEY)));

    const handleLogin = (token) => {
        if (!token) {
            console.error("Token is missing or invalid.");
            return;
        }
        console.log("log in");
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
        console.log("test");
        console.log(localStorage.getItem(ADMIN_TOKEN_KEY))
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        console.log('log out')
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setIsLoggedIn(false);
    }

    return (
        <div className= "ClientHome">
            {isLoggedIn ? <Base handleLogout = {handleLogout}/> : <AdminLogin handleLogin = {handleLogin}/>}
        </div>
    )
}

export default ClientHome;

