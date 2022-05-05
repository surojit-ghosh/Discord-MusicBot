import { pannel } from '../../helpers/functions.js';
import guildModel from '../../models/guild.js';

export default {
    name: 'queueEnd',
    run: async (client, player) => {
        const channel = client.channels.cache.get(player.textChannel);

        channel.send({
            embeds: [{
                color: client.color.default,
                description: 'Music queue ended'
            }]
        }).then((msg) => {
            setTimeout(() => msg?.delete(), 5 * 1000);
        });

        const guildData = await guildModel.findOne({ guildId: player.options.guild });
        client.channels.cache.get(guildData?.channelId).messages.fetch(guildData?.messageId).then(async (m) => {
            m.edit(await pannel(client));
        });

        player.pause(false);
        player.destroy();
    }
};