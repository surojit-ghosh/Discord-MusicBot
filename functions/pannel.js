import { MessageEmbed } from "discord.js";
import guildModel from "../models/guild.js";

const pannel = async (client, message = null, player = null) => {
    let content = '__**Queue list:**__';

    if (player) {
        let queue = await player.queue.map((song, index) => `${index + 1}. ${song.title}`);
        if (player.queue.totalSize > 0) {
            content += '\n\n' + queue.join('\n');
        } else {
            content = '__**Queue list:**__';
        }
        let embed = new MessageEmbed()
            .setTitle(player.queue.current.title)
            .setURL(player.queue.current.uri)
            .setDescription(` `)
            .setImage(player.queue.current.displayThumbnail("maxresdefault"));

        const guildData = await guildModel.findOne({ guildId: player.options.guild });
        client.channels.cache.get(guildData?.channelId).messages.fetch(guildData?.messageId).then((m) => {
            m.edit({ content, embeds: [embed] });
        });
        if (message) message.delete();
        return;
    } else {
        let embed = new MessageEmbed()
            .setTitle(`No song playing currently`)
            .setDescription(` `)
            .setImage('https://cdn.glitch.me/7e1889db-62a2-4acb-8903-8e9e7e936690%2Ficegif-87.gif?v=1638122767843');
        return {
            content,
            embeds: [embed]
        };
    }
};

export default pannel;