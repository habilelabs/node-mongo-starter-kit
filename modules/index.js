const user = require('./user');

const initiateRoutes = router => {
    user(router);
};

module.exports = initiateRoutes;