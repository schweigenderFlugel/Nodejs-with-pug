const express = require('express');

const infoRoutes = require('./info.router');
const subscribeRoutes = require('./subscribe.router');

const routerApi = (app) => {
    const router = express.Router();
    app.use('/v1/api', router);
    router.use('/info', infoRoutes);
    router.use('/subscribe', subscribeRoutes);
}

module.exports = routerApi;