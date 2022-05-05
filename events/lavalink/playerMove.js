export default {
    name: 'playerMove',
    run: async (client, player, oldChannel, newChannel) => {
        const guild = client.guilds.cache.get(player.guild);
        if (!guild) return;
        const channel = guild.channels.cache.get(player.textChannel);
        if (oldChannel === newChannel) return;
        if (newChannel === null || !newChannel) {
            if (!player) return;
            if (channel) channel.send({
                embeds: [{
                    color: client.color.error,
                    description: 'I\'ve been disconnected from <#' + oldChannel + '>'
                }]
            }).then((msg) => {
                setTimeout(() => msg?.delete(), 5 * 1000);
            });
            return player.destroy();
        } else {
            player.voiceChannel = newChannel;
            if (channel) channel.send({
                embeds: [{
                    color: client.color.error,
                    description: 'Player voice channel moved to <#' + newChannel + '>'
                }]
            }).then((msg) => {
                setTimeout(() => msg?.delete(), 5 * 1000);
            });
            if (player.paused) player.pause(false);
        }
    }
};