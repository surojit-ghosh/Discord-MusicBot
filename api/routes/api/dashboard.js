import { Router } from 'express';
import config from '../../../config.js';
import guildModel from '../../../models/guild.js';
import { checkAuth } from '../../utils/checkAuth.js';

const router = Router();

router.get('/prefix', checkAuth, async (req, res) => {
    const guildId = req.query?.guildId;
    const guildData = await guildModel.findOne({ guildId });
    const prefix = guildData?.prefix || config.prefix;
    res.json({ prefix });
});

router.post('/prefix', checkAuth, async (req, res) => {
    let guildData = await guildModel.findOne({ guildId: req.body.guildId });
    if (!guildData) guildData = new guildModel({ guildId: req.body.guildId });
    guildData.prefix = req.body.prefix;
    await guildData.save();
    res.sendStatus(200);
});

export default router;