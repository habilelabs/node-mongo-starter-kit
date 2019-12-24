/**
 * @file server.js
 * @summary Creates HTTP server
 * @description This file is responsible for connecting to mongoDB, creating an HTTP server and adding routes.
 * Server is created by binding express app instance.
 * */
const { createServer } = require("http");
const { log } = require("./errors");
const { constants } = require("./config");
const { app } = require("./app");
const { connectToMongoDb } = require("./db");

const { PORT, LOG_LEVELS } = constants;

connectToMongoDb();

const server = createServer(app);

// Event listeners to catch uncaught errors
process.on("unhandledRejection", error => {
    log(LOG_LEVELS.ERROR, error.message, { time: new Date() });
    process.exit(1);
});

process.on("exit", code => {
    console.log(`Exiting with code: ${code}`);
});

server.listen(PORT, err => {
    if (err) {
        return console.log(`Something went wrong: \n${err}`);
    }
    console.log(`Server is listening on port: ${PORT}`);
});