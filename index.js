import { Client, Collection } from 'discord.js';
import chalk from 'chalk';
import { readdirSync } from 'fs';
import { Manager } from 'erela.js';
import mongoose from 'mongoose';
import config from './config.js';

const client = new Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] });

['commands', 'slashCommands', 'aliases'].forEach((i) => client[i] = new Collection());
client.config = config;
client.color = config.color;
client.manager = new Manager({
    nodes: [config.lavalink],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    }
});

readdirSync('./events/client').filter((file) => file.endsWith('.js')).forEach((file) => {
    import('./events/client/' + file).then((event) => {
        event = event?.default;
        if (!event?.run) return console.log(chalk.bgRed(` [Event] `) + chalk.red(` unable to load :: ${file}`));
        event.name = event.name || file.replace('.js', '');
        try {
            client.on(event.name, event.run.bind(null, client));
            console.log(chalk.bgGreen(` [Event] `) + chalk.green(` successfully loaded :: ${file}`));
        } catch (error) {
            console.log(chalk.bgRed(` [Event] `) + chalk.red(` error while executing :: ${file}`));
        }
    });
});

readdirSync('events/lavalink').filter((file) => file.endsWith('.js')).forEach((file) => {
    import('./events/lavalink/' + file).then((event) => {
        event = event?.default;
        if (!event?.run) return console.log(chalk.bgRed(` [lavalink] `) + chalk.red(` unable to load :: ${file}`));
        event.name = event.name || file.replace('.js', '');
        try {
            client.manager.on(event.name, event.run.bind(null, client));
            console.log(chalk.bgGreen(` [lavalink] `) + chalk.green(` successfully loaded :: ${file}`));
        } catch (error) {
            console.log(chalk.bgRed(` [lavalink] `) + chalk.red(` error while executing :: ${file}`));
        }
    });
});

readdirSync('./commands').forEach((folder) => {
    readdirSync('./commands/' + folder).filter((file) => file.endsWith('.js')).forEach((command) => {
        import('./commands/' + folder + '/' + command).then((cmd) => {
            cmd = cmd.default;
            if (!cmd.run) return console.log(chalk.bgRed(` [Command] `) + chalk.red(` unable to load :: ${command}`));
            cmd.name = cmd.name || command.replace('.js', '');
            cmd.category = cmd.category || folder;
            console.log(chalk.bgGreen(` [Command] `) + chalk.green(` successfully loaded :: ${command}`));
            client.commands.set(cmd.name, cmd);
            if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
        });
    });
});

readdirSync('./slashCommands').forEach((folder) => {
    readdirSync('./slashCommands/' + folder).filter((file) => file.endsWith('.js')).forEach((command) => {
        import('./slashCommands/' + folder + '/' + command).then((cmd) => {
            cmd = cmd.default;
            if (!cmd.run || !cmd.data) return console.log(chalk.bgRed(` [Slash Command] `) + chalk.red(` unable to load the :: ${command}`));
            let name = cmd.data.name || command.replace('.js', '');
            cmd.category = cmd.category || folder;
            console.log(chalk.bgGreen(` [Slash Command] `) + chalk.green(` successfully loaded :: ${command}`));
            client.slashCommands.set(name, cmd);
        });
    });
});

mongoose.connect(config.db).then((db) => {
    console.log(chalk.bgGreen(` [DB] `) + chalk.green(` database connected :: ${db.connections[0].name}`));
}).catch((err) => {
    console.log(chalk.bgRed(` [DB] `) + chalk.red(` error while connecting to database :: ${err.message}`));
});

client.manager.on("nodeConnect", (node) => {
    console.log(chalk.bgGreen(` [lavalink] `) + chalk.green(` node connected :: ${node.options.identifier}`));
}).on("nodeCreate", (node) => {
    console.log(chalk.bgGreen(` [lavalink] `) + chalk.green(` node created :: ${node.options.identifier}`));
}).on("nodeReconnect", (node) => {
    console.log(chalk.bgGreen(` [lavalink] `) + chalk.red(` node reconnecting... :: ${node.options.identifier}`));
}).on("nodeDisconnect", (node) => {
    console.log(chalk.bgRed(` [lavalink] `) + chalk.red(` node disconnected :: ${node.options.identifier}`));
    setTimeout(() => node.connect(), 1 * 60 * 1000);
}).on("nodeError", (node, error) => {
    console.log(chalk.bgRed(` [lavalink] `) + chalk.red(` node errored :: ${node.options.identifier}`));
    setTimeout(() => node.connect(), 1 * 60 * 1000);
});

client.on("disconnect", () => {
    console.log(chalk.redBright("Bot is disconnecting..."))
}).on("reconnecting", () => {
    console.log(chalk.redBright("Bot reconnecting..."))
}).on('warn', (error) => {
    console.log(chalk.redBright(error))
}).on('error', (error) => {
    console.log(chalk.redBright(error))
});

process.on('unhandledRejection', (error) => {
    console.log(chalk.redBright(error))
}).on('uncaughtException', (error) => {
    console.log(chalk.redBright(error))
});

client.login(config.token);