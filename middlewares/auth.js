/**
 * @file auth.js
 * @summary User authentication and verification middleware
 * @description This file contains utility methods for authentication and verification of user.
 * */

const { sign, verify } = require("jsonwebtoken");
const { constants, messages } = require(__basedir + "/config");
const { throwUnAuthenticatedError } = require(__basedir + "/errors");

const { SECRET } = constants;

/**
 * Method to extract and verify JWT token from HTTP headers
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next HTTP next callback method
 * */
const authenticateUserWithToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            throwUnAuthenticatedError(messages.ACCESS_DENIED);
        }
        const authParts = auth.split(" ");
        if (authParts.length !== 2) {
            throwUnAuthenticatedError("Format is: Bearer <token>");
        }
        const [ scheme, token ] = authParts;
        if (new RegExp("^Bearer$").test(scheme)) {
            try {
                const user = await verify(token, SECRET);
                // eslint-disable-next-line
                req.user = user._doc;
                next();
            } catch (e) {
                throwUnAuthenticatedError(e.message);
            }
        } else {
            throwUnAuthenticatedError("Format is: Bearer <token>");
        }
    } catch (error) {
        return res.status(error.code).send({ error: error.message });
    }
};

/**
 * Method to generate token from a given payload
 * @param {object} payload Payload to be injected in token
 * */
const createToken = payload => {
    const tokenPayload = Object.assign({ time: new Date().getTime() }, payload);
    return sign(tokenPayload, SECRET, { expiresIn: "7 days" });
};

module.exports = {
    createToken,
    authenticateUserWithToken
};
