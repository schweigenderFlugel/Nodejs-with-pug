const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
    return res.render('chat/index', {
        socket: '/utils/sockets/chat',
    });
})

module.exports = router;