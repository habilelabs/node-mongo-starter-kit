/**
 * @file logger.js
 * @summary Contains logger configuration and definition
 * @description This file defines and exposes a log method to log errors to file and console
 * */
const { createLogger, format, transports } = require("winston");
const { join } = require("path");
const { constants } = require(__basedir + "/config");

const errorLogPath = join(__basedir, "/logs");
const { ENV, ENVIRONMENTS, LOG_LEVELS } = constants;

const logger = createLogger({
    level: LOG_LEVELS.DEBUG,
    format: format.json(),
    transports: [
        new transports.File({ filename: join(errorLogPath, "error.log"), level: LOG_LEVELS.ERROR }),
        new transports.File({ filename: join(errorLogPath, "combined.log") })
    ]
});

if (ENV === ENVIRONMENTS.DEVELOPMENT) {
    logger.add(new transports.Console({
        format: format.simple(),
        level: LOG_LEVELS.INFO
    }));
}

/**
 * Method to create a log entry. Depending on configuration it will log in file as well as console(stdout).
 * @param {string} level Log level such as DEBUG, INFO, etc
 * @param {string} message Message to log
 * @param {object} info Extra information to log
 * */
const log = (level, message, info) => {
    logger.log(level, message, info);
};

module.exports = {
    log
};
