import {ADMIN_TOKEN_KEY} from "../Constants";

export const login = (credential) => {
    const loginUrl = `/admin/login?email=${credential.username}&password=${credential.password}`;

    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                throw Error(data.message);
            }

            const token = data.data;
            console.log("Token:", token);
            return token;
        });
};


export const signup = (data) => {
    const signupUrl = "/signup";

    return fetch(signupUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to sign up");
        }
    });
};

export const getAllMusic = () => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    return fetch(`/music/findAllMusic`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get All Music");
        }
        return response.json();
    });
};


export const getAllUser = () => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    return fetch(`/user/findAllUser`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get All User");
        }
        return response.json();
    });
};
