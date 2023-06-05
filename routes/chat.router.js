const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
    return res.render('chat/index', {
        socket: '/js//socket-client-side.js',
    });
})

module.exports = router;