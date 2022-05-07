export default {
    name: 'ping',
    category: 'info',
    usage: 'ping',
    cooldown: 3 * 1000,
    permissions: {
        client: [],
        author: []
    },
    aliases: [],
    description: 'Gets websocket ping',
    run: async (client, message, args) => {
        return message.channel.send({
            embeds: [{
                color: client.color.default,
                description: `Ping: ${client.ws.ping}`
            }]
        });
    }
};