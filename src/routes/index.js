const express = require('express');

const usersRoutes = require('./users.router');
const articlesRoutes = require('./articles.router');
const commentsRoutes = require('./comments.router');
const categoriesRoutes = require('./categories.router');
const loginRoute = require('./login.router');
const refreshToken = require('./refresh-token.router');
const logoutRoute = require('./logout.router');
const passwordRecovery = require('./password-recovery.router');

const routes = (app) => {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', usersRoutes);
    router.use('/articles', articlesRoutes);
    router.use('/comments', commentsRoutes);
    router.use('/categories', categoriesRoutes);
    router.use('/login', loginRoute);
    router.use('/refresh-token', refreshToken);
    router.use('/logout', logoutRoute);
    router.use('/password-recovery', passwordRecovery)
}

module.exports = routes;