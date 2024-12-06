"use client";
import { AppContext } from "../appContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ContextProvider = ({ children }) => {
    const [auth_cookie, setAuth_cookie] = useState(Cookies.get("auth_cookie"));
    const [cartNumber, setCartNumber] = useState(-1);
    
    useEffect(() => {
        const url = "https://file-server.liara.run/api/cart-number";
        axios.get(url, { headers: { auth_cookie: auth_cookie } })
            .then(d => setCartNumber(d.data.number))
            .catch(d => setCartNumber(0))
    }, []);

    return (
        <AppContext.Provider value={{ cartNumber, setCartNumber }}>
            {children}
        </AppContext.Provider>
    )
}

export default ContextProvider;