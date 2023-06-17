const express = require('express');

const infoRoutes = require('./info.router');
const usersRoutes = require('./users.router');
const chatRoutes = require('./chat.router');
const articlesRoutes = require('./articles.router');
const commentsRoutes = require('./comments.router');

const routerViews = (app) => {
    const router = express.Router();
    app.use('/v1/api', router);
    router.use('/info', infoRoutes);
    router.use('/users', usersRoutes);
    router.use('/chat', chatRoutes);
    router.use('/articles', articlesRoutes);
    router.use('/comments', commentsRoutes);
}

module.exports = routerViews;