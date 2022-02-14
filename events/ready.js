import chalk from 'chalk';

export default {
    name: 'ready',
    run: async (client) => {
        console.log(chalk.greenBright('Ready logged in as - ' + client.user.username));
        client.manager.init(client.user.id);
    }
}