import { readdirSync } from 'fs';
import chalk from 'chalk';

const loadSlashCommands = (client) => {
    readdirSync('./slashCommands').forEach((folder) => {
        readdirSync('./slashCommands/' + folder).filter((file) => file.endsWith('.js')).forEach((command) => {
            import('../../slashCommands/' + folder + '/' + command).then((cmd) => {
                cmd = cmd.default;
                if (!cmd.run || !cmd.data) return console.log(chalk.bgRed(` [Slash Command] `) + chalk.red(` unable to load the :: ${command}`));
                let name = cmd.data.name || command.replace('.js', '');
                cmd.category = cmd.category || folder;
                console.log(chalk.bgGreen(` [Slash Command] `) + chalk.green(` successfully loaded :: ${command}`));
                client.slashCommands.set(name, cmd);
            });
        });
    });
    client.on('ready', () => {
        client.guilds.cache.get(client.config.guild).commands.set([...client.slashCommands].map((command) => command[1].data)).then(() => {
            console.log(chalk.bgGreen(` [Slash Command] `) + chalk.green(` successfully deployed`));
        }).catch((e) => console.log(chalk.red(e)));
    });
};

export default loadSlashCommands;