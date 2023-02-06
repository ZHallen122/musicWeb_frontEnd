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
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setIsLoggedIn(false);
    }

    return (
        <div className= "AdminMain">

            <Base/>
        </div>
    )
}

export default AdminMain;