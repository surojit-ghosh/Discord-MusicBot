import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

export default {
    token: process.env.TOKEN || '',
    db: process.env.DB || '',
    prefix: '?',
    guild: '904974628827594793',
    lavalink: {
        id: 'Main',
        host: process.env.LAVALINK_HOST || '',
        port: parseInt(process.env.LAVALINK_PORT) || 443,
        password: process.env.LAVALINK_PASSWORD || '',
        secure: true
    },
    color: {
        error: 'RED',
        default: '#00FFFF'
    }
}