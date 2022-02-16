import chalk from 'chalk';
import { Client, Collection } from 'discord.js';
import config from './settings/config.js';
import color from './settings/color.js';
import { loadCommands, loadEvents, loadSlashCommands, lavalinkManager as manager, loadDatabase } from './handlers.js';
import { logger } from './functions.js';

export default class extends Client {
    constructor() {
        super({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'] });

        ['commands', 'slashCommands', 'aliases'].forEach((col) => this[col] = new Collection());

        this.config = config;
        this.color = color;
        this.manager = manager(this);
        this.log = logger;

        loadEvents(this);
        loadCommands(this);
        loadSlashCommands(this);
        loadDatabase(this);

        this.on("disconnect", () => console.log(chalk.redBright("Bot is disconnecting...")));
        this.on("reconnecting", () => console.log(chalk.redBright("Bot reconnecting...")));
        this.on('warn', (error) => console.log(chalk.redBright(error)));
        this.on('error', (error) => console.log(chalk.redBright(error)));
        process.on('unhandledRejection', (error) => console.log(chalk.redBright(error)));
        process.on('uncaughtException', (error) => console.log(chalk.redBright(error)));

        super.login(config.token);
    }
}