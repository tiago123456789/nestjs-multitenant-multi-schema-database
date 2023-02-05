import React, { createContext, useEffect, useState } from "react"
import * as api from "./../services/api"
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const KEY_ACCESS_TOKEN_LOCALSTORE = "accessToken";
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    const authenticate = async (domain) => {
        const response =  await api.post("tenants/auth", { domain })
        localStorage.setItem(KEY_ACCESS_TOKEN_LOCALSTORE, response.token)
        setAccessToken(response.token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setAccessToken(null)
        localStorage.removeItem(KEY_ACCESS_TOKEN_LOCALSTORE)
    }

    useEffect(() => {
        const token = localStorage.getItem(KEY_ACCESS_TOKEN_LOCALSTORE)
        if (!accessToken && token) {
            setAccessToken(token)
            setIsAuthenticated(true)
        } else if (!token) {
            setAccessToken(null)
            setIsAuthenticated(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ 
            accessToken,
            logout, isAuthenticated, 
            authenticate, isAuthenticated 
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;