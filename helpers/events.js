const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync('./events/client/').filter((file) => file.endsWith('.js')).forEach((file) => {
        let event = require(`../events/client/${file}`);
        if (!event?.run) return console.log(`Unable to load event :: ${file}`);
        event.name = event.name || file.replace('.js', '');
        try {
            client.on(event.name, event.run.bind(null, client));
            console.log(`Successfully loaded event :: ${file}`);
        } catch (error) {
            console.log(`Error while executing :: ${file}`);
        }
    });

    readdirSync('./events/guild/').filter((file) => file.endsWith('.js')).forEach((file) => {
        let event = require(`../events/guild/${file}`);
        if (!event?.run) return console.log(`Unable to load event :: ${file}`);
        event.name = event.name || file.replace('.js', '');
        try {
            client.on(event.name, event.run.bind(null, client));
            console.log(`Successfully loaded event :: ${file}`);
        } catch (error) {
            console.log(`Error while executing :: ${file}`);
        }
    });
};