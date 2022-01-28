import { readdirSync } from 'fs';
import chalk from 'chalk';

const loadCommands = (client) => {
    readdirSync('./commands').forEach((folder) => {
        readdirSync('./commands/' + folder).filter((file) => file.endsWith('.js')).forEach((command) => {
            import('../../commands/' + folder + '/' + command).then((cmd) => {
                cmd = cmd.default;
                if (!cmd.run) return console.log(chalk.redBright(`${command} - Unable to load the command : missing the run function.`));
                cmd.name = cmd.name || command.replace('.js', '');
                cmd.category = cmd.category || folder;
                console.log(chalk.greenBright(`${command} - Successfully loaded the command`));
                client.commands.set(cmd.name, cmd);
                if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
            });
        });
    });
}

export default loadCommands;