export default {
    name: 'nodeCreate',
    run: async (client, node) => {
        console.log(`Node created : ${node.options.identifier}`);
    }
};