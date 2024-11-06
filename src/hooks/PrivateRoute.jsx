import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { authState } = useContext(AuthContext);
    return  authState.isAuthentication ? <Outlet /> : <Navigate to= "/login"/>;
  
}

export default PrivateRoute
