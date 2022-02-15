import mongoose from "mongoose";
import chalk from "chalk";

const databse = (client) => {
    mongoose.connect(client.config.db).then((db) => {
        console.log(chalk.bgGreen(` [DB] `) + chalk.green(` database connected :: ${db.connections[0].name}`));
    }).catch((err) => {
        console.log(chalk.bgRed(` [DB] `) + chalk.red(` error while connecting to database :: ${err.message}`));
    });
};

export default databse;