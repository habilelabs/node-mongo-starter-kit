const {AppError} = require("./appError");
const {constants} = require(__basedir + "/config");
const {ERROR, LOG_LEVELS, ENTITIES} = constants;

const throwUnAuthenticatedError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.UNAUTHENTICATED.TYPE, message, ERROR.UNAUTHENTICATED.CODE, isOperational);
};

const throwBadRequestError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.BAD_REQUEST.TYPE, message, ERROR.BAD_REQUEST.CODE, isOperational);
};

const throwNotFoundError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.NOT_FOUND.TYPE, message, ERROR.NOT_FOUND.CODE, isOperational);
};

const throwUnAuthorizedError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.UNAUTHORIZED.TYPE, message, ERROR.UNAUTHORIZED.CODE, isOperational);
};

const throwInternalServerError = (message, isOperational = true) => {
	throw new AppError(LOG_LEVELS.ERROR, ERROR.INTERNAL_SERVER_ERROR.TYPE, message, ERROR.INTERNAL_SERVER_ERROR.CODE, isOperational);
};

module.exports = {
	throwBadRequestError,
	throwInternalServerError,
	throwUnAuthenticatedError,
	throwUnAuthorizedError,
	throwNotFoundError
};
