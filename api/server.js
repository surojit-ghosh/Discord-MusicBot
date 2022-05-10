import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoStore from 'connect-mongo';
import config from '../config.js';
import apiRoute from './routes/commands.js';

const app = express();

export default async (client) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: [config.dashboardURL], credentials: true }));
    app.use(session({
        secret: ' yrDumrtdf5eXNMviuTYUfvrfHtFDbtc',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        },
        saveUninitialized: false,
        resave: false,
        name: 'discord.oauth2',
        store: new mongoStore({ mongoUrl: config.db })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => next()); // setTimeout

    app.use('/api', apiRoute(client));

    if (client.config.production) {
        app.use(express.static(path.join('./dashboard', 'build')));

        app.get('*', (req, res) => {
            res.sendFile('index.html', { root: path.resolve('./dashboard/build') });
        });
    };

    app.listen(config.port, () => console.log(`Server running on port : ${config.port}`));
};