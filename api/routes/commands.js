import { Router } from "express";
const router = Router();

export default (client) => {
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
        res.json({ prefix: client.config.prefix });
    });

    router.get('/name', (req, res) => {
        res.json({ name: client.user.username });
    });

    return router;
};