import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from './components'
import { Home, Commands, Dashboard, Profile } from './pages';
import userContext from './contexts/userContext.jsx';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/auth/status')
            .then((res) => res.json())
            .then((data) => {
                if (!data.msg) setUser(data);
            })
            .catch(() => { });
    }, []);

    return (
        <userContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/commands' element={<Commands />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/profile' element={<Profile />} />
                    {/* <Route path='/d' element={<Navigate to='/' />} /> */}
                </Routes>
            </BrowserRouter>
        </userContext.Provider>
    );
};

export default App;