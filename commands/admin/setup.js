import pannel from '../../functions/pannel.js';
import guildModel from '../../models/guild.js'

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
        let guildData = await guildModel.findOne({ guildId: message.guild.id });
        if (!guildData) guildData = new guildModel();

        guildData.guildId = message.guild.id;

        if (guildData?.channelId) {
            let cnl = await message.guild.channels.cache.get(guildData?.channelId);
            if (cnl) {
                try {
                    await cnl?.messages.fetch(guildData?.messageId);
                } catch (error) {
                    let msgg = await cnl?.send(pannel());
                    guildData.messageId = msgg.id;
                };
                guildData.save();
                return message.reply({
                    embeds: [{
                        color: client.color.error,
                        description: `Channel already exist <#${cnl.id}>`
                    }]
                });
            };
        };

        var channel = await message.guild.channels.create(`${client.user.username} commands`, {
            reason: `Music commands channel for ${client.user.username}`,
            permissionOverwrites: [
                {
                    id: client.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
                }
            ]
        });

        let mssg = await channel.send(pannel());

        guildData.channelId = channel.id;
        guildData.messageId = mssg.id;

        await guildData.save();

        message.reply({
            embeds: [{
                color: client.color.default,
                description: `Setup done <#${channel.id}>`
            }]
        });
    }
};