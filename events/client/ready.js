import chalk from 'chalk';
import pannel from '../../functions/pannel.js';

export default {
    name: 'ready',
    run: async (client) => {
        pannel(client)
        console.log(chalk.bgGreen(` [Bot] `) + chalk.green(' ready logged in as - ' + client.user.username));
        client.manager.init(client.user.id);
        client.guilds.cache.get(client.config.guild).commands.set([...client.slashCommands].map((command) => command[1].data)).then(() => {
            console.log(chalk.bgGreen(` [Slash Command] `) + chalk.green(` successfully deployed`));
        }).catch((e) => console.log(chalk.bgRed(` [Slash Command] `) + chalk.red(e)));
    }
}