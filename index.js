const { Client, Intents, Collection } = require("discord.js");
const { Manager } = require('erela.js');

const config = require('./config.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

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

['connectdb', 'commands', 'events', 'lavalink'].forEach((file) => require(`./helpers/${file}`)(client));

// nodejs events
process.on('unhandledRejection', (error) => {
    console.log(error);
}).on('uncaughtException', (error) => {
    console.log(error);
});

client.login(config.token);