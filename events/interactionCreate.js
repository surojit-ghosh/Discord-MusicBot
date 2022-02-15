export default {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        if (!interaction.isCommand()) return;
        await interaction.deferReply().catch(err => { })

        const { commandName } = interaction;
        const command = client.slashCommands.get(commandName);
        if (!command) return interaction.followUp("Unknown Command: Can not find this command in bot.");

        try {
            if (command) await command.run(client, interaction);
        } catch (err) {
            console.log(err);
            return interaction.followUp(`Something went wrong while executing the command.`);
        };
    }
};