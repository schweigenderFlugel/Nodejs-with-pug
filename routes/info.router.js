const express = require('express');

const router = express.Router();
const InfoService = require('../services/info.service');

const service = new InfoService();

router.get('/', async (req, res, next) => {
    const data = await service.getInfo();
    return res.render('info/index', {
        description: data.info.description,
        target: data.info.target,
        footer: data.info.footer,
        lorem: data.info.lorem,
        moreInformation: data.info.moreInformation
    })
})

module.exports = router;