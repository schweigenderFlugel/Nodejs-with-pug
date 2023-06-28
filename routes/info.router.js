const express = require('express');

const router = express.Router();
const InfoService = require('../services/info.service');

const service = new InfoService();

router.get('/', async (req, res, next) => {
    const info = await service.getInfo();
    const news = await service.getNews();
    
    // function getFullNews(item) {
    //     return item.noticia;
    // }

    return res.render('info/index', {
        description: info.info.description,
        target: info.info.target,
        footer: info.info.footer,
        lorem: info.info.lorem,
        moreInformation: info.info.moreInformation,
        news: news?.map((item) => ( item.noticia ))
    })
})

router.get('/news', async (req, res, next) => {
    const news = await service.getNews();
    res.status(200).json(news);
})

router.post('/', async (req, res, next) => {
    const newData = req.body;
    const newInfo = await service.createNews(newData);
    res.status(201).json(newInfo)
})

module.exports = router;