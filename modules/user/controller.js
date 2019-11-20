const { getUserData, addUserData } = require("./actions");

const getUser = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const data = await getUserData(userId);
        return res.status(200).send({data});

    } catch (error) {
        return res.status(error.code).send({
            error: error.message
        });
    }
};

const addUser = async (req, res) => {
    try {

        const userObj = req.body;
        const data = await addUserData(userObj);
        return res.status(200).send({data});

    } catch (error) {
        return res.status(error.code).send({
            error: error.message
        });
    }
};

module.exports = {
    getUser,
    addUser
};