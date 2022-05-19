import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ServerPicker from './ServerPicker.jsx';

const Dashboard = () => {
    const { id } = useParams();
    const [mutualGuilds, setMutualGuilds] = useState([]);
    const [adminGuilds, setAdminGuilds] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/api/guilds')
            .then((res) => res.json())
            .then((data) => {
                setAdminGuilds(data.adminGuilds);
                setMutualGuilds(data.mutualGuilds);
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    return (
        <>
            {!error && !id ? (
                <ServerPicker
                    adminGuilds={adminGuilds}
                    mutualGuilds={mutualGuilds}
                />
            ) : (
                <div>Dashboard</div>
            )}
        </>
    );
};

export default Dashboard;