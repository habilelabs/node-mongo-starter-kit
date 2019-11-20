const { createServer } = require("http");
const { logger } = require("./errors");
const { constants } = require("./config");
const initiateRoutes = require("./modules");
const { app, router } = require("./app");
const { connectToMongoDb } = require("./db");

const { PORT, LOG_LEVELS } = constants;

connectToMongoDb();

initiateRoutes(router);

const server = createServer(app);

process.on("unhandledRejection", error => {
    logger.log(LOG_LEVELS.ERROR, error.message, { time: new Date() });
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