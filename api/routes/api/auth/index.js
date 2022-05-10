import { Router } from 'express';
import passport from 'passport';
import config from '../../../../config.js';

const router = Router();

router.get('/discord', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord'), (req, res) => res.redirect(config.dashboardURL));

router.get('/status', (req, res) => req.user ? res.send({ userId: req.user.userId }) : res.send({ msg: 'Unauthorized' }));

export default router;