const { authenticateUserWithToken } = require(__basedir + "/lib");
const { getUser, addUser } = require('./controller');

module.exports = router => {

    router.get("/users",
        authenticateUserWithToken,
        getUser);

    router.post("/users", addUser);

};
