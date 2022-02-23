export default {
    name: 'raw',
    run: async (client, d) => {
        client.manager?.updateVoiceState(d);
    }
};