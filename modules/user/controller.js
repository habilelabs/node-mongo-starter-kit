/**
 * @file controller.js
 * @summary User controllers
 * @description This file contains controller definition for user entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */

const { getUserData, addUserData } = require("./actions");
const { constants } = require(__basedir + "/config");
const { SUCCESS } = constants;

/**
 * Controller to get user data by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next next method
 * */
const getUser = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const data = await getUserData(userId);
        res.status(SUCCESS.CODE).send({ data });
        next();
    } catch (error) {
        res.status(error.code).send({
            error: error.message
        });
        next();
    }
};

/**
 * Controller to add/create new user
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next next method
 * */
const addUser = async (req, res, next) => {
    try {
        const userObj = req.body;
        const data = await addUserData(userObj);
        res.status(SUCCESS.CODE).send({ data });
        next();
    } catch (error) {
        res.status(error.code).send({
            error: error.message
        });
        next();
    }
};

module.exports = {
    getUser,
    addUser
};