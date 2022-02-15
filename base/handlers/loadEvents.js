import { readdirSync } from 'fs';
import chalk from 'chalk';

const loadEvents = (client) => {
    readdirSync('./events').filter((file) => file.endsWith('.js')).forEach((file) => {
        import('../../events/' + file).then((event) => {
            event = event?.default;
            if (!event?.run) return console.log(chalk.bgRed(` [Event] `) + chalk.red(` unable to load - ${file}`));
            event.name = event.name || file.replace('.js', '');
            try {
                client.on(event.name, event.run.bind(null, client));
                console.log(chalk.bgGreen(` [Event] `) + chalk.green(` successfully loaded - ${file}`));
            } catch (error) {
                console.log(chalk.bgRed(` [Event] `) + chalk.red(` error while executing - ${file}`));
            }
        });
    });
}

export default loadEvents;