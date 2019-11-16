const {Users} = require(__basedir + "/db/models");

const getUserById = (userId, selection = {}) => Users.findOne({
	_id: userId
}, selection).lean();

const getUsers = (condition = {}, selection = {}) => Users.find(condition, selection).lean();

const createUser = (userObj) => {
	const user = new Users(userObj);
	return user.save();
};

const updateUserById = (userId, updates) => Users.updateOne({
	_id: userId
}, {
	$set: updates
});

const updateUsers = (condition = {}, updates) => Users.updateMany(condition, {
	$set: updates
});

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUsers,
	updateUserById
};
