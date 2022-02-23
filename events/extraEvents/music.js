import { MessageEmbed } from 'discord.js';
import guildModel from '../../models/guild.js';

const music = async (client, message) => {
    const guildData = await guildModel.findOne({ guildId: message.guild.id });
    const cnl = message.guild.channels.cache.get(guildData?.channelId);
};

export default music;