import React, { Children, createContext, useEffect } from 'react'
import useLocalStorage from 'use-local-storage';
import api from '../api/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useLocalStorage('authStates', {
        isAuthentication: false,
        token: null
    })

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const token = response.data.data.accessToken;
            setAuthState({
                isAuthentication: true,
                token
            })
            

        } catch (error) {
            console.log("login failed", error);
            return false;
        }
    }
    const logout = () => {
        setAuthState({
            isAuthentication: false,
            token: null
        })
    }
    const isTokenExpired = (token) => {
        if (!token) return true;
        const { exp } = jwtDecode(token);
        return Date.now() >= exp * 1000;
    }
    useEffect(() => {
        if (authState.token && isTokenExpired(authState.token)) {
            logout();
        }
    }, [authState.token])
    return (
        <AuthContext.Provider value={{ authState, login, logout, isTokenExpired }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
