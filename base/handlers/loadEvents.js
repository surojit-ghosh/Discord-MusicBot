import { readdirSync } from 'fs';
import chalk from 'chalk';

const loadEvents = (client) => {
    readdirSync('./events').filter((file) => file.endsWith('.js')).forEach((file) => {
        import('../../events/' + file).then((event) => {
            event = event.default;
            if (!event.run) return console.log(chalk.redBright(`Unable to load the event - ${file}`));
            event.name = event.name || file.replace('.js', '');
            try {
                client.on(event.name, event.run.bind(null, client));
                console.log(chalk.greenBright(`Successfully loaded the event - ${file}`));
            } catch (error) {
                console.log(chalk.redBright(`Error while executing event - ${file}`));
            }
        });
    });
}

export default loadEvents;