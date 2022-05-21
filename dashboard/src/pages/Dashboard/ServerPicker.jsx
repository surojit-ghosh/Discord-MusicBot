import React from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/index.js';
import { API_URL, DISCORD_CDN, INVITE_LINK } from '../../utils/constants.js';

import './ServerPicker.scss';

const ServerPicker = ({ adminGuilds, mutualGuilds, isFetching }) => {

    return (
        <>
            {isFetching ? <Loading /> :
                <>
                    <h1 className='sp__header'>Select a server to configure</h1>
                    <div className="servers">
                        {adminGuilds.map((adminGuild, index) => (
                            <div key={index} className='server-container'>
                                <img src={`${DISCORD_CDN}/icons/${adminGuild.id}/${adminGuild.icon}.png`} alt="Server Logo" />
                                <span>{adminGuild.name}</span>
                                {mutualGuilds.some((mutualGuild) => mutualGuild.id === adminGuild.id) ?
                                    <Link to={`/dashboard/${adminGuild.id}`}>Config</Link> :
                                    <a href={`${INVITE_LINK}&guild_id=${adminGuild.id}&response_type=code&redirect_uri=${API_URL}/api/guilds/redirect`}>Invite</a>
                                }
                            </div>
                        ))}
                    </div>
                </>
            }
        </>
    );
};

export default ServerPicker;