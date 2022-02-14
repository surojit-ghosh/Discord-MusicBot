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
        console.log(chalk.greenBright(`Node connected :: ${node.options.identifier}`));
    }).on("nodeCreate", (node) => {
        console.log(chalk.greenBright(`Node created :: ${node.options.identifier}`));
    }).on("nodeReconnect", (node) => {
        console.log(chalk.redBright(`Node reconnecting... :: ${node.options.identifier}`));
    }).on("nodeDisconnect", (node) => {
        console.log(chalk.redBright(`Node disconnected :: ${node.options.identifier}`));
        setTimeout(() => {
            node.connect();
        }, 1000);
    }).on("nodeError", (node, error) => {
        console.log(chalk.redBright(`Node errored :: ${node.options.identifier}`));
        setTimeout(() => {
            node.connect();
        }, 1000);
    });
}

export default lavalink;