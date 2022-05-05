import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import guildModel from '../models/guild.js';

const pannel = async (client, player = null) => {
    let content = '__**Queue list:**__';
    let row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('pause').setEmoji('967012014713102387').setStyle('SECONDARY'),
        new MessageButton().setCustomId('stop').setEmoji('967012230765875250').setStyle('SECONDARY'),
        new MessageButton().setCustomId('next').setEmoji('967012522135814215').setStyle('SECONDARY'),
        new MessageButton().setCustomId('volume_down').setEmoji('967108365694148709').setStyle('SECONDARY'),
        new MessageButton().setCustomId('volume_up').setEmoji('967110331958714438').setStyle('SECONDARY')
    );

    if (player) {
        let queue = await player.queue.map((song, index) => `${index + 1}. ${song.title}`);
        if (player.queue.totalSize > 0 && player.queue.totalSize < 10) {
            content += '\n\n' + queue.join('\n');
        } else if (player.queue.totalSize > 10) {
            let songs = queue.slice(0, 10);
            content += '\n\n' + songs.join('\n') + '\n\n' + (player.queue.totalSize - 10) + ' more songs in the queue';
        }

        if (player.paused) {
            row.components[0].customId = 'play';
            row.components[0].emoji.id = '967011786723311677';
        }

        let embed = new MessageEmbed()
            .setColor(client.color.default)
            .setTitle(player.queue.current.title)
            .setURL(player.queue.current.uri)
            .setDescription(` `)
            .setImage(player.queue.current.displayThumbnail("maxresdefault"))
            .setFooter({ text: `Requested By: ${player.queue.current.requester.username} | Volume: ${player.volume}%` })

        const guildData = await guildModel.findOne({ guildId: player.options.guild });
        client.channels.cache.get(guildData?.channelId).messages.fetch(guildData?.messageId).then((m) => {
            m.edit({ content, embeds: [embed], components: [row] });
        });
        return;
    } else {
        let embed = new MessageEmbed()
            .setTitle(`No song playing currently`)
            .setColor(client.color.default)
            .setDescription(`Send a song name or url to play`)
            .setImage('https://c.tenor.com/Wgo-XGZmUNAAAAAC/music-listening-to-music.gif');
        return {
            content,
            embeds: [embed],
            components: [row]
        };
    }
};

export { pannel };