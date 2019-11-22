const swaggerJSDoc = require('swagger-jsdoc');
const { constants } = require(__basedir + "/config");
const { ENV, PORT } = constants;

const environments = {
    DEVELOPMENT: {
        host: 'localhost:' + PORT,
        schemes: [ 'http' ]
    },
    PRODUCTION: {
        host: '',
        schemes: [ 'https' ]
    }
};

const swaggerDefinition = {
    swagger: '2.0',
    info: {
        title: 'Node-mongo-starter-kit App API V1',
        version: '1.0.0',
        description: 'API to interact with Node-mongo-starter-kit App V1',
    },
    host: environments[ENV] && environments[ENV].host,
    schemes: environments[ENV] && environments[ENV].schemes,
    basePath: '/api/v1',
    securityDefinitions: {
        JWT: {
            description: "Bearer Token",
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        }
    },
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [ './modules/**/*.js' ],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;