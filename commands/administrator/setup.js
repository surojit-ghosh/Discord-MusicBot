import { pannel } from '../../base/functions.js';

export default {
    name: 'setup',
    category: 'admin',
    usage: 'setup',
    cooldown: 1 * 60 * 1000,
    permissions: {
        client: [],
        author: []
    },
    aliases: [],
    description: 'Set up the music commands channel',
    run: async (client, message, args) => {
        var channel = await message.guild.channels.create(`${client.user.username} commands`, {
            reason: `Music commands channel for ${client.user.username}`,
            permissionOverwrites: [
                {
                    id: client.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
                }
            ]
        });

        channel.send(pannel());
    }
}