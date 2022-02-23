import { MessageEmbed, MessageAttachment } from "discord.js";

const pannel = (client, player = null) => {
    const content = '__**Queue list:**__';

    const attachment = new MessageAttachment('./structure/assets/music.gif', 'music.gif');
    const embed = new MessageEmbed()
        .setDescription(`Music`)
        .setImage('attachment://music.gif')

    return {
        content,
        embeds: [embed],
        files: [attachment]
    };
};

export default pannel;