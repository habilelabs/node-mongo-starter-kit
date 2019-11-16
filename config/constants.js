const {config} = require("dotenv");

const dotEnv = config();

if (dotEnv.error) {
	throw dotEnv.error;
}

const {
	PORT,
	ENV,
	SECRET,
	MONGO_URI
} = process.env;

const constants = {
	PORT,
	ENV,
	SECRET,
	MONGO_URI,
	ENVIRONMENTS: {
		DEVELOPMENT: "development",
		PRODUCTION: "production"
	},
	LOG_LEVELS: {
		INFO: "info",
		ERROR: "error",
		DEBUG: "debug",
	},
	ERROR: {
		BAD_REQUEST: {
			TYPE: "BAD_REQUEST",
			CODE: 400
		},
		NOT_FOUND: {
			TYPE: "NOT_FOUND",
			CODE: 404
		},
		INTERNAL_SERVER_ERROR: {
			TYPE: "INTERNAL_SERVER_ERROR",
			CODE: 500
		},
		UNAUTHORIZED: {
			TYPE: "UNAUTHORIZED",
			CODE: 403
		},
		UNAUTHENTICATED: {
			TYPE: "UNAUTHENTICATED",
			CODE: 402
		}
	}
};

module.exports = {
	constants
};
