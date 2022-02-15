import { Manager } from 'erela.js';
import chalk from 'chalk';

const lavalink = (client) => {
    return new Manager({
        nodes: [client.config.lavalink],
        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    }).on("nodeConnect", (node) => {
        console.log(chalk.bgGreen(` [lavalink] `) + chalk.greenBright(` node connected :: ${node.options.identifier}`));
    }).on("nodeCreate", (node) => {
        console.log(chalk.bgGreen(` [lavalink] `) + chalk.greenBright(` node created :: ${node.options.identifier}`));
    }).on("nodeReconnect", (node) => {
        console.log(chalk.bgGreen(` [lavalink] `) + chalk.redBright(` node reconnecting... :: ${node.options.identifier}`));
    }).on("nodeDisconnect", (node) => {
        console.log(chalk.bgRed(` [lavalink] `) + chalk.redBright(` node disconnected :: ${node.options.identifier}`));
        setTimeout(() => node.connect(), 1 * 60 * 1000);
    }).on("nodeError", (node, error) => {
        console.log(chalk.bgRed(` [lavalink] `) + chalk.redBright(` node errored :: ${node.options.identifier}`));
        setTimeout(() => node.connect(), 1 * 60 * 1000);
    });
};

export default lavalink;