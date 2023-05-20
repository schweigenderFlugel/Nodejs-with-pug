const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
    return res.render('subscribe/index', {
        title: "Aquí debemos colocar el código del servicio",
    })
})

module.exports = router;