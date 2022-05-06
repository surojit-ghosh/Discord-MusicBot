import { MessageEmbed } from 'discord.js';
import ms from 'pretty-ms';
import os from 'node-os-utils';

export default {
    name: 'botinfo',
    category: 'info',
    usage: 'botinfo',
    cooldown: 5 * 1000,
    permissions: {
        client: [],
        author: []
    },
    aliases: [],
    description: 'Gets info about me',
    run: async (client, message, args) => {
        const cpu = await os.cpu.usage();
        const ram = await os.mem.info();
        const uptime = ms(client.uptime);

        let embed = new MessageEmbed()
            .setColor(client.color.default)
            .setTitle('Information about ' + client.user.username)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription('```\nCPU Usage  : ' + cpu + ' %' +
                '\nRam Usage  : ' + Math.ceil(ram.usedMemMb) + '/' + Math.ceil(ram.totalMemMb) + ' MB' +
                '\nUptime     : ' + uptime +
                '\nPing       : ' + client.ws.ping + ' ms\n```')
            .setTimestamp();

        return message.channel.send({ embeds: [embed] });
    }
};