const {logger} = require("./logger");

function AppError(errorLevel, errorType, errorMessage, errorCode, isOperational) {
	Error.call(this);
	Error.captureStackTrace(this);
	this.type = errorType;
	this.message = errorMessage;
	// status code to throw(if any).
	this.code = errorCode;
	this.level = errorLevel;
	// true, when our app throws an error intentionally, e.g.: Missing some input
	this.isOperational = isOperational;
	this.time = new Date();
	logger.log(
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

AppError.prototype.__proto__ = Error.prototype;

module.exports = {
	AppError
};
