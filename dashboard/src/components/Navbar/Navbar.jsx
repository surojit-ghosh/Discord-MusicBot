import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { API_URL } from '../../utils/constants.js';
import './Navbar.scss';

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [name, setName] = useState('Harmony');

    useEffect(() => {
        fetch('/api/auth/status').then((res) => res.json())
            .then((data) => {
                console.table(data);
            })
            .catch(() => { });

        fetch('/api/name')
            .then((res) => res.json())
            .then((data) => {
                setName(data.name);
            })
            .catch(() => { });
    }, []);

    const Pages = () => {
        return (
            <div className="pages">
                <NavLink onClick={() => setActive(!active)} to='/'>Home</NavLink>
                <NavLink onClick={() => setActive(!active)} to='/commands'>Commands</NavLink>
                <NavLink onClick={() => setActive(!active)} to='/dashboard'>Dashboard</NavLink>
                <a onClick={() => setActive(!active)} target='_blank' rel="noopener noreferrer" href="https://discord.gg/KpSY4ej7mv">Support Server</a>
                <a onClick={() => setActive(!active)} className='invite' href='/'>Add Bot</a>
            </div>
        );
    };

    const Login = () => {
        return (
            <a onClick={() => setActive(!active)} className='login' href={API_URL + '/api/auth/discord'}>Login</a>
        );
    };

    const Btns = () => {
        return (
            <div className="btns">
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
                    <Link to='/'>{name}</Link>
                </div>
                {!active && (<Login />)}
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