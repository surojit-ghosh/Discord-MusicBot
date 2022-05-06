import express from 'express';
import path from 'path';
import apiRoutea from './routes/commands.js';

const app = express();

export default async (client) => {
    const port = client.config.port;

    app.use('/api', apiRoutea(client));

    if (client.config.host) {
        app.use(express.static(path.join('./dashboard', 'build')));
        app.get('*', (req, res) => {
            res.sendFile(path.join('./dashboard', 'build', 'index.html'));
        });
    };

    app.listen(port, () => console.log(`Server running on port : ${port}`));
};