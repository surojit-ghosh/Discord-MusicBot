import { Client } from 'discord.js';
import config from '../config.js';

export default class extends Client {
    constructor() {
        super({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'] });

        super.login(config.token);
    }
}