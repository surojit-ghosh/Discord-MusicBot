import { config } from 'dotenv';
config({ path: './config.env' });

export default {
    token: process.env.CLIENT_TOKEN || "",
    db: process.env.DB || "",
    prefix: process.env.PREFIX || "",
    port: process.env.PORT || 3001,
    production: process.env.PRODUCTION ? true : false,
    dashboardURL: process.env.DASHBOARD_URL || '',
    color: {
        default: '00FFFF',
        error: 'RED'
    },
    lavalink: {
        id: 'Main',
        host: process.env.LAVALINK_HOST || '',
        port: parseInt(process.env.LAVALINK_PORT) || 2333,
        password: process.env.LAVALINK_PASSWORD || ''
    },
};