/**
 * @file swagger.js
 * @summary Configure and initialize swagger
 * @description This file contains swagger configuration and initiates swagger and
 * exposes swagger routes to be used by express app.
 * */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { constants } = require(__basedir + "/config");
const { ENV, PORT, ENVIRONMENTS } = constants;

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

const initiateSwagger = router => {
    // Serve swagger docs only for non-production environments
    if (ENV !== ENVIRONMENTS.PRODUCTION) {
        router.get('/api-docs.json', function (req, res) {
            res.send(swaggerSpec);
        });
        router.use('/api-docs', swaggerUi.serveFiles(swaggerSpec));
        router.get('/api-docs', (req, res) => {
            res.send(swaggerUi.generateHTML(swaggerSpec));
        });
    }
};

module.exports = initiateSwagger;