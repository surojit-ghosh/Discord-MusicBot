import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Add or remove monitoring website"),
    run: async (client, interaction) => {
        interaction.followUp({ content: `🏓 | Ping is \`${client.ws.ping}\` ms.` })
    }
}