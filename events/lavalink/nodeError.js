module.exports.run = (client, node) => {
    console.log(`Node errored :: ${node.options.identifier}`);
    setTimeout(() => node.connect(), 1 * 60 * 1000);
};