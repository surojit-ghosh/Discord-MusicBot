import chalk from 'chalk';
import { Client, Collection } from 'discord.js';
import config from '../config.js';
import { loadCommands, loadEvents, loadSlashCommands, lavalinkManager as manager } from './handlers.js';

export default class extends Client {
    constructor() {
        super({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'] });

        ['commands', 'slashCommands', 'aliases'].forEach((col) => this[col] = new Collection());

        this.config = config;
        this.manager = manager(this);

        loadEvents(this);
        loadCommands(this);
        loadSlashCommands(this);

        this.on("disconnect", () => console.log(chalk.redBright("Bot is disconnecting...")));
        this.on("reconnecting", () => console.log(chalk.redBright("Bot reconnecting...")));
        this.on('warn', (error) => console.log(chalk.redBright(error)));
        this.on('error', (error) => console.log(chalk.redBright(error)));
        process.on('unhandledRejection', (error) => console.log(chalk.redBright(error)));
        process.on('uncaughtException', (error) => console.log(chalk.redBright(error)));

        super.login(config.token);
    }
}