import server from '../../api/server.js';

export default {
    name: 'ready',
    run: async (client) => {
        console.log('Ready logged in as : ' + client.user.tag);

        server(client);

        const activities = [
            { name: `${client.config.prefix}help | ${client.config.prefix}invite`, type: 'PLAYING' },
            { name: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Users in ${client.guilds.cache.size} Guilds`, type: 'WATCHING' }
        ];

        setInterval(() => {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            client.user.setActivity(activity.name, { type: activity.type });
        }, 1000 * 3);

        client.manager.init(client.user.id);

        if (client.config.production) {
            client.application.commands.set(client.slashCommands.map((cmd) => cmd)).then((data) => {
                console.log(`${data.size} slashCommands registered`);
            }).catch((e) => console.log(e));
        };
    }
};