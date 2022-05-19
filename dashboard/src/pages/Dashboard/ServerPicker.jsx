import React from 'react';

const ServerPicker = ({ adminGuilds, mutualGuilds }) => {

    return (
        <>
            {adminGuilds.map((s, i) => (
                <div key={i}>{s.name}</div>
            ))}
        </>
    );
};

export default ServerPicker;