/**
 * @file appError.js
 * @summary Contains error definition
 * @description This file defines and exposes a custom error class which inherits existing error class
 * and adds more information to it.
 * */

const { log } = require("./logger");

/**
 * Constructor function for creating instances of error.It also logs error.
 * @param {string} level Error level such as DEBUG, INFO, etc
 * @param {string} errorType Error type such as BAD_REQUEST, NOT_FOUND, etc
 * @param {string} errorMessage Error message
 * @param {number} errorCode HTTP status code
 * @param {boolean} isOperational Determines whether our app throws error intentionally or its unhandled rejection
 * */
function AppError(level, errorType, errorMessage, errorCode, isOperational) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.type = errorType;
    this.message = errorMessage;
    // status code to throw.
    this.code = errorCode;
    this.level = level;
    // true, when our app throws an error intentionally, e.g.: Missing some input
    this.isOperational = isOperational;
    this.time = new Date();
    // log error
    log(
        this.level,
        this.message,
        {
            code: this.code,
            type: this.type,
            time: this.time,
            isOperational: this.isOperational
        }
    );
}

// inherit from Error class
AppError.prototype.__proto__ = Error.prototype;

module.exports = {
    AppError
};
