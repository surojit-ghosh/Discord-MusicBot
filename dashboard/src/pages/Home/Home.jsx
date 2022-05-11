import React, { useContext } from 'react';
import mainContext from '../../contexts/mainContext.jsx';

import { DISCORD_CDN, INVITE_LINK, SUPPORT_SERVER } from '../../utils/constants.js';
import './Home.scss';

const Home = () => {
  const { bot } = useContext(mainContext);
  return (
    <>
      <div className="home">
        <div className="header">
          <img src={`${DISCORD_CDN}/avatars/${bot.id}/${bot.avatar}.png`} alt="logo" />
          <div className="botinfo">
            <p><span>{bot.username}</span> | Discord Music Bot</p>
            <p>A high quality, premium discord music bot.</p>
          </div>
          <div className="btns">
            <a className='invite' target='_blank' rel="noopener noreferrer" href={INVITE_LINK} >Invite Bot</a>
            <a className='support' target='_blank' rel="noopener noreferrer" href={SUPPORT_SERVER} >Support Server</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;