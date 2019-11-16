const cluster = require("cluster");
const {cpus} = require("os");
const {constants} = require("./config");

global.__basedir = __dirname;
const bootScript = "./server.js";
const {ENV, ENVIRONMENTS} = constants;

if (cluster.isMaster) {
	const cpuCount = ENV === ENVIRONMENTS.DEVELOPMENT ? 1 : cpus().length;
	// fork node processes
	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}

	// listen for dying workers
	cluster.on('exit', (worker, code, signal) => {
		if (code !== 0 && !worker.exitedAfterDisconnect) {
			console.log(`worker ${worker.id} crashed. Starting a new worker...`);
			cluster.fork();
		}
	});

	process.on('SIGUSR2', () => {
		// delete cached modules
		delete require.cache[require.resolve(bootScript)];
		const workerProcesses = Object.keys(cluster.workers);
		workerProcesses.forEach(worker => {
			console.log(`Killing ${worker}`);
			cluster.workers[worker].disconnect();
			cluster.workers[worker].on("disconnect", () => {
				console.log(`Shutdown complete for ${worker}`);
			});
			const newWorker = cluster.fork();
			newWorker.on("listening", () => {
				console.log(`New worker: ${worker} is listening now.`);
			});
		});
	});
} else {
	require(bootScript);
}
