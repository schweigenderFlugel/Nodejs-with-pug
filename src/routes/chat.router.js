const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
    return res.render('chat/index', {
        socket: '/js//socket-client-side.js',
        styles: '/js/styles.js'
    });
})


router.post('/', async(req, res, next) => {
    res.send(req.body);
})

module.exports = router;