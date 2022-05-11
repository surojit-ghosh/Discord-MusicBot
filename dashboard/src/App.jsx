import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from './components'
import { Home, Commands, Dashboard, Profile, Loading } from './pages';
import mainContext from './contexts/mainContext.jsx';

const App = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [is_Fetching, setIs_Fetching] = useState(true);
    const [user, setUser] = useState(null);
    const [bot, setBot] = useState(null);

    useEffect(() => {
        fetch('/api/auth/status')
            .then((res) => res.json())
            .then((data) => {
                if (!data.msg) setUser(data);
            })
            .catch(() => { })
            .finally(() => setIsFetching(false));

        fetch('/api/bot')
            .then((res) => res.json())
            .then((data) => setBot(data))
            .catch(() => { })
            .finally(() => setIs_Fetching(false));
    }, []);

    return (
        <>
            {(isFetching || is_Fetching) ? (<Loading />) : (
                <mainContext.Provider value={{ user, bot }}>
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
                </mainContext.Provider>
            )}
        </>
    );
};

export default App;