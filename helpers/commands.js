const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync('./commands').forEach((folder) => {
        readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js')).forEach((file) => {
            let cmd = require(`../commands/${folder}/${file}`);
            if (!cmd?.run) return console.log(`Unable to load command :: ${file}`);
            cmd.name = cmd.name || file.replace('.js', '');
            cmd.category = cmd.category || folder;
            client.commands.set(cmd.name, cmd);
            if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
            console.log(`Successfully loaded command :: ${file}`);
        });
    });
};