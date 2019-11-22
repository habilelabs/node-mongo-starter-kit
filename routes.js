const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const modules = require('./modules/');
const { ENV, ENVIRONMENTS } = constants;

// Serve swagger docs only for non-production environments
if (ENV === ENVIRONMENTS.PRODUCTION) {
    router.get('/api-docs.json', function (req, res) {
        res.send(swaggerSpec);
    });
    router.use('/api-docs', swaggerUi.serveFiles(swaggerSpec));
    router.get('/api-docs', (req, res) => {
        res.send(swaggerUi.generateHTML(swaggerSpec));
    });
}

// Add all module routes
modules(router);

module.exports = router;