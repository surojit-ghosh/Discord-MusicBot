export default {
    name: 'nodeReconnect',
    run: async (client, node) => {
        console.log(`Node reconnecting... :: ${node.options.identifier}`);
    }
};