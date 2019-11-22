const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const router = express.Router();
const initiateSwagger = require("./swagger");

const app = express();

app.use(urlencoded({
    extended: true
}));

app.use(json({
    extended: true
}));

app.use(cors());

app.use('/api/v1', router);

initiateSwagger(router);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access", "application/json");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(express.static("public"));

module.exports = {
    app,
    router
};
