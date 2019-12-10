const { users } = require(__basedir + "/db/controllers");
const { createToken } = require(__basedir + "/middlewares");
const { throwBadRequestError } = require(__basedir + "/errors");
const { messages } = require(__basedir + "/config");

/**
 * Method to add new user
 * @param {object} userObj User object.
 * */
const addUserData = async userObj => {
    const user = await users.getUser({ email: userObj.email });
    if (user) {
        throwBadRequestError(messages.USER_ALREADY_EXISTS);
    }
    const result = await users.createUser(userObj);
    const token = await createToken(result);
    return {
        user: result,
        token
    };
};

module.exports = {
    addUserData
};