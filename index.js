import { Client, Collection } from "discord.js";
import config from './config.js';
import { readdirSync } from 'fs';
import mongoose from "mongoose";
import { Manager } from "erela.js";

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES'] });

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = config;
client.color = config.color;

// Connect to mongoDB
mongoose.connect(config.db).then((connection) => {
    console.log(`Connected to database : ${connection.connections[0].name}`);
}).catch((error) => {
    console.log(`Unavle to connect to the database. Error : ${error}`);
});

// Lavalink client
client.manager = new Manager({
    nodes: [config.lavalink],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    }
});

// Load all client events
readdirSync('./events/client').filter((file) => file.endsWith('.js')).forEach((file) => {
    import(`./events/client/${file}`).then((event) => {
        event = event?.default;
        if (!event?.run) return console.log(`Unable to load event : ${file}`);
        event.name = event.name || file.replace('.js', '');
        client.on(event.name, event.run.bind(null, client));
        console.log(`Successfully loaded event : ${file}`);
    });
});

// Load all commands
readdirSync('./commands').forEach((folder) => {
    readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js')).forEach((file) => {
        import(`./commands/${folder}/${file}`).then((cmd) => {
            cmd = cmd?.default;
            if (!cmd?.run) return console.log(`Unable to load command : ${file}`);
            cmd.name = cmd.name || file.replace('.js', '');
            cmd.category = cmd.category || folder;
            client.commands.set(cmd.name, cmd);
            if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
            console.log(`Successfully loaded command : ${file}`);
        });
    });
});

// Load all slash commands
readdirSync('./slashCommands').forEach((folder) => {
    readdirSync(`./slashCommands/${folder}`).filter((file) => file.endsWith('.js')).forEach((file) => {
        let cmd = require(`./slashCommands/${folder}/${file}`);
        if (!cmd?.run || !cmd?.data) return console.log(chalk.red(`Unable to load slash command : ${file}`));
        let name = cmd.data.name;
        client.slashCommands.set(name, cmd);
        console.log(`Successfully loaded slash command : ${file}`);
    });
});

// Load lavalink events
readdirSync('./events/lavalink').filter((file) => file.endsWith('.js')).forEach((file) => {
    import(`./events/lavalink/${file}`).then((event) => {
        event = event?.default;
        if (!event?.run) return console.log(`Unable to load lavalink event : ${file}`);
        event.name = event.name || file.replace('.js', '');
        client.manager.on(event.name, event.run.bind(null, client));
        console.log(`Successfully loaded lavalink event : ${file}`);
    });
});

client.login(config.token);