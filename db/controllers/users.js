const { Users } = require(__basedir + "/db/models");

const getUserById = (userId, selection = {}) => Users.findOne({
    _id: userId
}, selection).lean();

const getUser = (condition = {}, selection = {}) => Users.findOne(condition, selection).lean();

const createUser = (userObj) => {
    const user = new Users(userObj);
    return user.save();
};

const updateUserById = (userId, updates) => Users.updateOne({
    _id: userId
}, {
    $set: updates
});

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUserById
};
