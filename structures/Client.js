import { Client, Collection } from 'discord.js';
import config from '../config.js';
import { loadCommands, loadEvents } from './handlers/main.js';

export default class extends Client {
    constructor() {
        super({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'] });

        this.commands = new Collection();
        this.aliases = new Collection();

        loadCommands(this);
        loadEvents(this);

        super.login(config.token);
    }
}