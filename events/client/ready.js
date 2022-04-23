module.exports.run = (client) => {
    console.log('Ready logged in as :: ' + client.user.tag);

    client.user.setActivity('Music');

    client.manager.init(client.user.id);

    if (client.config.production) {
        client.application.commands.set(client.slashCommands.map((cmd) => cmd)).then((data) => {
            console.log(`${data.size} slashCommands registered`);
        }).catch((e) => console.log(e));
    };
};