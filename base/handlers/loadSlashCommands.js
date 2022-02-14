import { readdirSync } from 'fs';
import chalk from 'chalk';

const loadSlashCommands = (client) => {
    let commands = [];
    readdirSync('./slashCommands').forEach((folder) => {
        readdirSync('./slashCommands/' + folder).filter((file) => file.endsWith('.js')).forEach((command) => {
            import('../../slashCommands/' + folder + '/' + command).then((cmd) => {
                cmd = cmd.default;
                if (!cmd.run || !cmd.data) return console.log(chalk.redBright(`Unable to load the slash command - ${command}`));
                cmd.name = cmd.name || command.replace('.js', '');
                cmd.category = cmd.category || folder;
                console.log(chalk.greenBright(`Successfully loaded the slash command - ${command}`));
                commands.push(cmd);
                client.slashCommands.set(cmd.name, cmd);
            });
        });
    });
    client.on('ready', () => {
        client.guilds.cache.get(client.config.guild).commands.set([...client.slashCommands].map((command) => command[1].data)).then(() => {
            console.log(chalk.greenBright(`Successfully deployed all slash commands`));
        }).catch((e) => console.log(chalk.redBright(e)));
    });
}

export default loadSlashCommands;