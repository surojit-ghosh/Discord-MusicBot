export default {
    name: 'trackStuck',
    run: async (client, player, track, payload) => {
        console.error(payload.error);

        const channel = client.channels.cache.get(player.textChannel);
        channel.send({
            embeds: [{
                color: client.color.error,
                description: 'Error when loading song!'
            }]
        }).then((msg) => {
            setTimeout(() => msg?.delete(), 5 * 1000);
        });
        console.log(`Error when loading song! error in : ${player.guild}`);
        player.stop();
        if (!player.voiceChannel) player.destroy();
    }
};