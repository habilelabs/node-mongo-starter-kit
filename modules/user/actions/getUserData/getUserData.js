const { users } = require(__basedir + "/db/controllers");
const { throwNotFoundError } = require(__basedir + "/errors");

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