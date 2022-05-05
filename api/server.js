import express from 'express';
import config from '../config.js';

const app = express();
const port = config.port;

export default async (client) => {
    app.get('/', (req, res) => {
        res.send(`Ok`);
    });

    app.listen(port, () => console.log(`Server running on port : ${port}`));
};