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
const { ENV, ENVIRONMENTS, LOG_LEVELS } = constants;

const errorLogRotateTransport = new transports.DailyRotateFile({
    filename: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    dirname: errorLogPath,
    level: LOG_LEVELS.ERROR
});

const combinedLogRotateTransport = new transports.DailyRotateFile({
    filename: 'combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    dirname: combinedLogPath
});

const logger = createLogger({
    level: LOG_LEVELS.DEBUG,
    format: format.json(),
    transports: [
        errorLogRotateTransport,
        combinedLogRotateTransport
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
