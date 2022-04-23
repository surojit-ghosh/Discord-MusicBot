const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync('./slashCommands').forEach((folder) => {
        readdirSync(`../slashCommands/${folder}`).filter((file) => file.endsWith('.js')).forEach((file) => {
            let cmd = require(`./slashCommands/${folder}/${file}`);
            if (!cmd?.run || !cmd?.data) return console.log(chalk.red(`Unable to load slash command :: ${file}`));
            let name = cmd.data.name;
            client.slashCommands.set(name, cmd);
            console.log(`Successfully loaded slash command :: ${file}`);
        });
    });
};