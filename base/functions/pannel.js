import { MessageEmbed } from "discord.js";
import { stripIndent } from 'common-tags';

const pannel = () => {
    const content = stripIndent`
    __**Queue list:**__
    OK
    `;

    const embed = new MessageEmbed()
        .setDescription(`Music`)

    return {
        content,
        embeds: [embed]
    };
};

export default pannel;