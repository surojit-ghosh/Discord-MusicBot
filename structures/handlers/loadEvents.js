import { readdirSync } from 'fs';
import chalk from 'chalk';
import { Console } from 'console';

const loadEvents = (client) => {
    readdirSync('./events').filter((file) => file.endsWith('.js')).forEach((file) => {
        import('../../events/' + file).then((event) => {
            event = event.default;
            if (!event.run) return console.log(chalk.redBright(`${file} - Unable to load the event : missing the run function.`));
            event.name = event.name || file.replace('.js', '');
            try {
                client.on(event.name, event.run.bind(null, client));
                console.log(chalk.greenBright(`${file} - Successfully loaded the event`));
            } catch (error) {
                console.log(chalk.redBright(`Error while executing event - ${file}`));
            }
        });
    });
}

export default loadEvents;