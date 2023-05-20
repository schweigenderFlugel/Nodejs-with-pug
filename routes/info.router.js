const express = require('express');

const router = express.Router();
const InfoService = require('../services/info.service');

const service = new InfoService();

router.get('/', async (req, res, next) => {
    const data = await service.getInfo();
    return res.render('info/index', {
        title: data.title,
        description: data.description,
        footer: data.footer,
    })
})

module.exports = router;