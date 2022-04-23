module.exports = {
    name: 'raw',
    run: async (client, d) => {
        client.manager?.updateVoiceState(d);
    }
};