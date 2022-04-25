const guildModel = require('../../models/guild.js');
const { pannel } = require('../../helpers/functions.js');

module.exports = {
    run: async (client, player, track, playload) => {
        const guildData = await guildModel.findOne({ guildId: player.options.guild });
        const channel = await client.guilds.cache.get(player.options.guild).channels.cache.get(player.options.textChannel);
        const message = await channel.messages.fetch(guildData.messageId);

        const collector = message.createMessageComponentCollector({
            filter: (m) => {
                if (m.guild.me.voice.channel && m.guild.me.voice.channelId === m.member.voice.channelId) return true;
                else {
                    m.reply({
                        embeds: [{
                            color: client.color.error,
                            description: `You must be in the same voice channel as me to use this button`
                        }],
                        ephemeral: true
                    });
                    return false;
                };
            },
            time: track.duration
        });

        collector.on("collect", async (i) => {
            if (i.customId == 'play' || i.customId == 'pause') {
                if (!player) return collector.stop();
                player.pause(!player.paused);
                let text = player.paused ? `Paused` : `Resumed`;
                i.reply({ embeds: [{ color: client.color.default, description: `Player **${text}**` }] });
                setTimeout(() => { i.deleteReply(); }, 3 * 1000);
                pannel(client, player);
            } else if (i.customId == 'stop') {
                if (!player) return collector.stop();
                await player.stop();
                await player.queue.clear();
                i.reply({ embeds: [{ color: client.color.default, description: `Queue cleared` }] });
                setTimeout(() => { i.deleteReply(); }, 3 * 1000);
                pannel(client, player);
            } else if (i.customId == 'next') {
                if (!player) return collector.stop();
                await player.stop();
                i.reply({ embeds: [{ color: client.color.default, description: `Song skipped` }] });
                if (track.length === 1) return collector.stop();
                setTimeout(() => { i.deleteReply(); }, 3 * 1000);
                pannel(client, player);
            } else if (i.customId == 'volume_down') {
                if (!player) return collector.stop();
                if (Number(player.volume) <= 10) {
                    i.reply({ embeds: [{ color: client.color.default, description: `Volume can't be lower than \`10\`` }] });
                    setTimeout(() => { i.deleteReply(); }, 3 * 1000);
                    return;
                }
                i.deferUpdate();
                let amount = Number(player.volume) - 10;
                await player.setVolume(amount);
                pannel(client, player);
            } else if (i.customId == 'volume_up') {
                if (!player) return collector.stop();
                if (Number(player.volume) >= 100) {
                    i.reply({ embeds: [{ color: client.color.default, description: `Volume can't be more than \`100\`` }] });
                    setTimeout(() => { i.deleteReply(); }, 3 * 1000);
                    return;
                }
                i.deferUpdate();
                let amount = Number(player.volume) + 10;
                await player.setVolume(amount);
                pannel(client, player);
            }
        });

        pannel(client, player);
    }
};