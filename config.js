require('dotenv').config({ path: './config.env' });

module.exports = {
    token: process.env.TOKEN || "",
    db: process.env.DB || "",
    prefix: process.env.PREFIX || "",
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