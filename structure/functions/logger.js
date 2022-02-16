import chalk from "chalk";

const logger = (msg, type = null) => {
    if (type == 'error') {
        console.log(chalk.bgRed(` [Error] `) + chalk.red(msg));
    } else {
        console.log(msg);
    }
};

export default logger;