/**
 * @file logger.js
 * @summary Contains logger configuration and definition
 * @description This file defines and exposes a log method to log errors to file and console
 * */
const { createLogger, format, transports } = require("winston");
require('winston-daily-rotate-file');
const { join } = require("path");
const { constants } = require(__basedir + "/config");
const errorLogPath = join(__basedir, "/logs/errors");
const combinedLogPath = join(__basedir, "/logs/combined");

const { ENV, ENVIRONMENTS, LOG_LEVELS, LOG_CONFIG, ENABLE_DEBUG_LOGS } = constants;

const loggerConfig = {
    datePattern: LOG_CONFIG.DATE_PATTERN,
    zippedArchive: true,
    maxFiles: LOG_CONFIG.MAX_FILE
};

const errorLogRotateTransport = new transports.DailyRotateFile(Object.assign({
    filename: 'error-%DATE%.log',
    dirname: errorLogPath,
    level: LOG_LEVELS.ERROR
}, loggerConfig));

const combinedLogRotateTransport = new transports.DailyRotateFile(Object.assign({
    filename: 'combined-%DATE%.log',
    dirname: combinedLogPath
}, loggerConfig));

const logger = createLogger({
    level: ENABLE_DEBUG_LOGS ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO,
    format: format.json(),
    transports: [
        errorLogRotateTransport,
        combinedLogRotateTransport
    ]
});

if (ENV === ENVIRONMENTS.DEVELOPMENT) {
    logger.add(new transports.Console({
        format: format.simple(),
        level: ENABLE_DEBUG_LOGS ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO
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
