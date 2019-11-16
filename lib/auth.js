const {sign, verify} = require("jsonwebtoken");
const {constants} = require(__basedir + "/config");
const {throwUnAuthenticatedError} = require(__basedir + "/errors");

const {SECRET} = constants;

const authenticateUserWithToken = function (auth) {
	if (!auth) {
		throwUnAuthenticatedError("Access denied.");
	}
	const authParts = auth.split(" ");
	if (authParts.length !== 2) {
		throwUnAuthenticatedError("Format is: Bearer <token>");
	}
	const [scheme, token] = authParts;
	if (new RegExp("^Bearer$").test(scheme)) {
		try {
			return verify(token, SECRET);
		} catch (e) {
			throwUnAuthenticatedError(e.message);
		}
	} else {
		throwUnAuthenticatedError("Format is: Bearer <token>");
	}
};

const createToken = function (payload) {
	const tokenPayload = Object.assign({time: new Date().getTime()}, payload);
	return sign(tokenPayload, SECRET, {expiresIn: "7 days"});
};

module.exports = {
	createToken,
	authenticateUserWithToken
};
