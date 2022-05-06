export default {
    name: 'nodeDisconnect',
    run: async (client, node) => {
        console.log(`Node disconnected : ${node.options.identifier}`);
        setTimeout(() => node.connect(), 1 * 60 * 1000);
    }
};