import { Router } from "express";
import config from "../../../config.js";
import authRoute from './auth/index.js';
import guildRoute from './guilds/index.js';

const router = Router();

export default (client) => {
    router.use('/auth', authRoute);
    router.use('/guild', guildRoute);

    router.get('/commands', (req, res) => {
        const commands = client.commands.map((cmd) => cmd);
        let data = { all: [] };
        for (let item of commands) {
            data[item.category] ? data[item.category].push(item) : data[item.category] = [item];
            data.all.push(item);
        };
        res.json(data);
    });

    router.get('/prefix', (req, res) => {
        res.json({ prefix: config.prefix });
    });

    router.get('/name', (req, res) => {
        res.json({ name: client.user.username });
    });

    return router;
};