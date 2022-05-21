import { Router } from 'express';
import passport from 'passport';
import axios from 'axios';
import config from '../../../config.js';
import { DISCORD_API_URL } from '../../utils/constants.js';

const router = Router();

router.get('/discord', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord'), (req, res) => res.redirect(config.dashboardURL + '/dashboard'));

router.get('/status', async (req, res) => {
    if (req.user) {
        const { data: userData } = await axios.get(DISCORD_API_URL + '/users/@me', {
            headers: { Authorization: `Bearer ${req.user.accessToken}` }
        });
        res.send(userData)
    } else {
        res.send({ msg: 'Unauthorized' })
    }
});

router.get('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.redirect(config.dashboardURL);
    } else {
        res.redirect(config.dashboardURL);
    }
});

export default router;