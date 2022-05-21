import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import ServerPicker from './ServerPicker.jsx';
import './Dashboard.scss'
import { DISCORD_CDN } from '../../utils/constants.js';
import General from './General.jsx';
import Settings from './Settings.jsx';

const Dashboard = () => {
    const { id } = useParams();
    const [mutualGuilds, setMutualGuilds] = useState([]);
    const [guild, setGuild] = useState(null);
    const [adminGuilds, setAdminGuilds] = useState([]);
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [active, setActive] = useState('general')

    useEffect(() => {
        fetch('/api/guilds')
            .then((res) => res.json())
            .then((data) => {
                setAdminGuilds(data.adminGuilds);
                setMutualGuilds(data.mutualGuilds);
                setIsFetching(false);
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    useEffect(() => {
        if (id) setGuild(mutualGuilds.filter((mutualGuild) => mutualGuild.id === id)[0]);
    }, [mutualGuilds, id]);

    const handleClick = (btnName) => {
        setActive(btnName);
    };

    return (
        <>
            {!error && !id ? (
                <ServerPicker
                    adminGuilds={adminGuilds}
                    mutualGuilds={mutualGuilds}
                    isFetching={isFetching}
                />
            ) : (
                <>
                    {!mutualGuilds.some((mutualGuild) => mutualGuild.id === id) && <Navigate to='/dashboard' />}
                    <div className='dashboard_header'>
                        {guild && <img src={`${DISCORD_CDN}/icons/${guild?.id}/${guild?.icon}.png`} alt="Server Logo" />}
                        <h1><span>{guild?.name}</span> Configuration</h1>
                    </div>
                    <Link className='back' to='/dashboard'><AiOutlineArrowLeft />Back to Servers</Link>
                    <div className="dashboard">
                        <div className="features_nav">
                            <button className={active === 'general' ? 'active' : ''} onClick={() => handleClick('general')}>General</button>
                            <button className={active === 'settings' ? 'active' : ''} onClick={() => handleClick('settings')}>Bot Settings</button>
                        </div>
                        {active === 'general' && <General id={id} />}
                        {active === 'settings' && <Settings id={id} />}
                    </div>
                </>
            )}
        </>
    );
};

export default Dashboard;