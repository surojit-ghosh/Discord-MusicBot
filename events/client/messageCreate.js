import guildModel from '../../models/guild.js';
let cooldown = {};

export default {
    name: 'messageCreate',
    run: async (client, message) => {
        if (message.author.bot || !message.guild || message.webhookId) return;

        const guildData = await guildModel.findOne({ guildId: message.guild.id });
        client.prefix = guildData?.prefix ? guildData?.prefix : client.config.prefix;
        if (!message.content.startsWith(client.prefix)) return;

        if (!message.member) message.member = await message.guild.members.fetch(message);

        const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (!command) return;

        if (command.permissions?.client) {
            let perms = ['SEND_MESSAGES', 'EMBED_LINKS', ...command.permissions?.client];
            const Permissions = perms.filter((x) => !message.guild.me.permissions.has(x)).map((x) => '`' + x + '`');
            if (Permissions.length) return message.channel.send({
                embeds: [{
                    color: client.color.error,
                    description: `I need ${Permissions.join(', ')} permission(s) to execute the command!`,
                }]
            }).catch(() => { });
        }

        if (command.permissions?.author) {
            const Permissions = command.permissions.author.filter((x) => !message.member.permissions.has(x)).map((x) => '`' + x + '`');
            if (Permissions.length) return message.channel.send({
                embeds: [{
                    color: client.color.error,
                    description: `You need ${Permissions.join(', ')} permission(s) to execute this command!`,
                }]
            }).catch(() => { });
        }

        let uCooldown = cooldown[message.author.id];
        if (!uCooldown) {
            cooldown[message.author.id] = {};
            uCooldown = cooldown[message.author.id];
        }
        let time = uCooldown[command.name] || 0;
        if (time && time > Date.now()) return message.channel.send({
            embeds: [{
                color: client.color.error,
                description: `You can again use this command in ${Math.ceil((time - Date.now()) / 1000)} second(s)`,
            }]
        });
        cooldown[message.author.id][command.name] = Date.now() + command.cooldown;

        if (command) command.run(client, message, args);
    }
}