const mongoose = require("mongoose");
const { constants } = require(__basedir + "/config");

const { MONGO_URI } = constants;

const connectToMongoDb = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on("connected", () => {
        console.log("MongoDb connected on port 27017");
    });
    mongoose.connection.on("error", (err) => {
        console.log(`An error occurred. ERROR: ${err}`);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("MongoDb disconnected!");
    });
};

module.exports = {
    connectToMongoDb
};
