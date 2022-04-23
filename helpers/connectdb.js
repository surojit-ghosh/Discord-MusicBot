const mongoose = require('mongoose');

module.exports = (client) => {
    mongoose.connect(client.config.db).then((db) => {
        console.log(`Database connected :: ${db.connections[0].name}`);
    }).catch((err) => {
        console.log(chalk.red(`Error while connecting to database :: ${err.message}`));
    });
};