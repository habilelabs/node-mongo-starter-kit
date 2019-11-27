/**
 * @file index.js
 * @summary Initiate and expose routes
 * */
const user = require('./user');

const initiateRoutes = router => {
    // all modules with routes will be added here
    user(router);
};

module.exports = initiateRoutes;