/**
 * @file controller.js
 * @summary User controllers
 * @description This file contains controller definition for user entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */

const { getUserData, addUserData } = require("./actions");

/**
 * Controller to get user data by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const getUser = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const data = await getUserData(userId);
        return res.status(200).send({ data });
    } catch (error) {
        return res.status(error.code).send({
            error: error.message
        });
    }
};

/**
 * Controller to add/create new user
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const addUser = async (req, res) => {
    try {

        const userObj = req.body;
        const data = await addUserData(userObj);
        return res.status(200).send({ data });

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