const { users } = require(__basedir + "/db/controllers");
const { throwNotFoundError } = require(__basedir + "/errors");

/**
 * Method to get user data by id
 * @param {string} userId User Id
 * */
const getUserData = async userId => {
    const user = await users.getUserById(userId);
    if (!user) {
        throwNotFoundError("User not found.");
    }
    return user;
};

module.exports = {
    getUserData
};