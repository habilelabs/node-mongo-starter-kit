const { users } = require(__basedir + "/db/controllers");
const { throwNotFoundError } = require(__basedir + "/errors");
const { messages } = require(__basedir + "/config");

/**
 * Method to get user data by id
 * @param {string} userId User Id
 * */
const getUserData = async userId => {
    const user = await users.getUserById(userId);
    if (!user) {
        throwNotFoundError(messages.USER_NOT_FOUND);
    }
    return user;
};

module.exports = {
    getUserData
};