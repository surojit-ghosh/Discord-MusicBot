import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import { Strategy } from 'passport-discord';
import session from 'express-session';
import config from '../config.js';
import routes from './routes/index.js';
import userModel from '../models/user.js';

const app = express();

export default async (client) => {
    passport.serializeUser((user, done) => {
        return done(null, user.userId);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findOne({ userId: id });
            return user ? done(null, user) : done(null, null);
        } catch (err) {
            console.log(err);
            return done(err, null);
        }
    });

    passport.use(new Strategy(
        {
            clientID: config.clientId,
            clientSecret: config.clientSecret,
            callbackURL: config.callBackURL,
            scope: ['identify', 'guilds'],
        },
        async (accessToken, refreshToken, profile, done) => {
            const { id: userId } = profile;
            try {
                const existingUser = await userModel.findOneAndUpdate(
                    { userId },
                    { accessToken, refreshToken },
                    { new: true }
                );
                if (existingUser) return done(null, existingUser);
                const newUser = new userModel({ userId, accessToken, refreshToken });
                const savedUser = await newUser.save();
                return done(null, savedUser);
            } catch (err) {
                console.log(err);
                return done(err, undefined);
            }
        }
    )
    );

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

    app.use('/', routes(client));

    if (client.config.production) {
        app.use(express.static(path.join('./dashboard', 'build')));

        app.get('*', (req, res) => {
            res.sendFile('index.html', { root: path.resolve('./dashboard/build') });
        });
    };

    app.listen(config.port, () => console.log(`Server running on port : ${config.port}`));
};