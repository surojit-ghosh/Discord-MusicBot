import React, { useEffect } from 'react';
import { API_URL } from '../utils/constants.js';

const Login = () => {
    useEffect(() => {
        window.location.href = API_URL + '/api/auth/discord';
    }, []);

    return (
        <h1>Redirecting...</h1>
    );
};

export default Login;