const { users } = require(__basedir + "/db/controllers");
const { createToken } = require(__basedir + "/lib");
const { throwBadRequestError } = require(__basedir + "/errors");

const addUserData = async userObj => {
    const user = await users.getUser({ email: userObj.email });
    if (user) {
        throwBadRequestError("User already exists.");
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