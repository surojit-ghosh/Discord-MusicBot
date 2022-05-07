import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
    const [active, setActive] = useState(false);

    const Pages = () => {
        return (
            <div className="pages">
                <NavLink onClick={() => setActive(!active)} to='/'>Home</NavLink>
                <NavLink onClick={() => setActive(!active)}  to='/commands'>Commands</NavLink>
                <NavLink onClick={() => setActive(!active)}  to='/dashboard'>Dashboard</NavLink>
                <a onClick={() => setActive(!active)} target='_blank' rel="noopener noreferrer" href="https://discord.gg/KpSY4ej7mv">Support Server</a>
            </div>
        );
    };

    const Login = () => {
        return (
            <a onClick={() => setActive(!active)} className='login' href="/">Login</a>
        );
    };

    const Btns = () => {
        return (
            <div className="btns">
                <a onClick={() => setActive(!active)} className='invite' href="/">Add Bot</a>
                <Login />
            </div>
        );
    };

    return (
        <>
            <div className='navbar'>
                <div className={active ? 'menu active-menu' : 'menu'} onClick={() => setActive(!active)}>
                    <div className='menu-btn'></div>
                </div>

                <div className="logo">
                    <Link to='/'>Harmony</Link>
                </div>
                {!active &&(<Login />)}
                <Pages />
                <Btns />

            </div>
            {active && (
                <div className='responsive'>
                    <Pages />
                    <Btns />
                </div>
            )}
        </>
    );
};

export default Navbar;