const {createServer} = require("http");
const open = require("open");
const {logger} = require("./errors");
const {constants} = require("./config");
const initiateRoutes = require("./modules");
const {app, router} = require("./app");
const {connectToMongoDb} = require("./db");

const {PORT} = constants;

connectToMongoDb();

initiateRoutes(router);

const server = createServer(app);

process.on("unhandledRejection", error => {
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
	open(`http://localhost:${PORT}/graphql`);
});