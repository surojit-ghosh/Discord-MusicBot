import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder()
        .setName('monitor')
        .setDescription("Add or remove monitoring website")
        .addStringOption((option) =>
            option.setName('option')
                .setDescription('Choose any one option')
                .setRequired(true)
                .addChoice('Add', 'link_add')
                .addChoice('Remove', 'link_remove'))
        .addStringOption((option) =>
            option.setName('link')
                .setDescription('Which link you want to monitor?')
                .setRequired(true)),
    run: async (client, interaction) => {
    }
}