import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import mainContext from '../contexts/mainContext.jsx';

const Auth = ({ children }) => {
    const { user } = useContext(mainContext);

    return user ? children : <Navigate to='/login' />;
};

export default Auth;