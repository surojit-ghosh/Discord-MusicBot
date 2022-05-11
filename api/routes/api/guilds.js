import { Router } from 'express';
import axios from 'axios';
import { checkAuth } from '../../utils/checkAuth.js'
import config from '../../../config.js';
import { DISCORD_API_URL } from '../../utils/constants.js';

const router = Router();

router.get('/', checkAuth, async (req, res) => {
    const { data: botGuilds } = await axios.get(DISCORD_API_URL + '/users/@me/guilds', {
        headers: { Authorization: `Bot ${config.token}` }
    });

    const { data: userGuilds } = await axios.get(DISCORD_API_URL + '/users/@me/guilds', {
        headers: { Authorization: `Bearer ${req.user.accessToken}` }
    });

    const adminGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) === 0x8).filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id));
    res.json(adminGuilds);
});

export default router;