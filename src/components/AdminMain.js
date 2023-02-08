import React, {useState} from "react";
import AdminLogin from "./adminComponents/AdminLogin";
import AdminTopBar from "./adminComponents/AdminTopBar";
import AdminHome from "./adminComponents/AdminHome";

import AdminHeader from "./adminComponents/AdminHeader";
import AdminContent from "./adminComponents/AdminContent";
import AdminNavigator from "./adminComponents/AdminNavigator";
import AdminMusicList from "./adminComponents/AdminMusicList";
import Base from "./adminComponents/base";
import {ADMIN_TOKEN_KEY} from "../Constants";

function AdminMain() {
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
        <div className= "AdminMain">
            {isLoggedIn ? <Base handleLogout = {handleLogout}/> : <AdminLogin handleLogin = {handleLogin}/>}
        </div>
    )
}

export default AdminMain;