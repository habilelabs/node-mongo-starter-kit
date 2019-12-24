const { log } = require(__basedir + "/errors");
const { constants } = require(__basedir + "/config");
const { ENV, ENVIRONMENTS, LOG_LEVELS } = constants;

const accessLogger = (req, res) => {
    const {
        method,
        originalUrl,
        url,
        httpVersion,
        headers,
        connection,
        ip
    } = req;
    const { statusCode, statusMessage } = res;
    log(LOG_LEVELS.INFO, null, {
        category: "ACCESS", 
        method,
        url: originalUrl || url,
        httpVersion,
        statusCode,
        statusMessage,
        contentLength: headers[ "content-length" ],
        contentType: headers[ "content-type" ],
        userAgent: headers[ "user-agent" ],
        remoteAddress: ip || connection[ "remoteAddress" ],
        time: new Date()
    });
    res.end();
};

module.exports = {
    accessLogger
};