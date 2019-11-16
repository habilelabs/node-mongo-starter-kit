const { getUser, addUser, updateUser } = require('./controller');

module.exports = router => {
    router.get("/api/v1/users", getUser);
    router.post("/api/v1/users", addUser);
    router.put("/api/v1/users", updateUser);
};
