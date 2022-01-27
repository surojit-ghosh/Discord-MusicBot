import dotenv from 'dotenv';
dotenv.config();

export default {
    token: process.env.TOKEN || '',
    db: process.env.DB || '',
    prefix: '.'
}