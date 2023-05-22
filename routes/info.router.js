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

router.patch('/update-user-data/:id', async (req, res, next) => {
     const data = await service.getInfo(id);
     const update = await service.Update(body);
}



module.exports = router;