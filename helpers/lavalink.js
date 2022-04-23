const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync('./events/lavalink').filter((file) => file.endsWith('.js')).forEach((file) => {
        let event = require(`../events/lavalink/${file}`);
        if (!event?.run) return console.log(`Unable to load lavalink event :: ${file}`);
        event.name = event.name || file.replace('.js', '');
        try {
            client.manager.on(event.name, event.run.bind(null, client));
            console.log(`Successfully loaded lavalink event :: ${file}`);
        } catch (error) {
            console.log(`Error while executing :: ${file}`);
        }
    });
};