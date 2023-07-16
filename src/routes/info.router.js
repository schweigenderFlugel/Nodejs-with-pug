const express = require('express');
const router = express.Router();
const InfoService = require('../services/info.service');
const ArticlesService = require('../services/articles.service');

const service = new InfoService();

router.get('/news', async (req, res, next) => {
    const news = await service.getNews();
    res.status(200).json(news);
})

router.get('/news/:id', async (req, res, next) => {
    const { id } = req.params;
    const news = await service.getNewsById(id);
    res.status(200).json(news);
})

router.post('/news', async (req, res, next) => {
    const newData = req.body;
    const newInfo = await service.createNews(newData);
    res.status(201).json(newInfo)
})

router.patch('/news/:id', async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    const news = await service.updateNews(id, changes);
    res.status(201).json(news);
})

router.delete('/news/:id', async (req, res, next) => {
    const { id } = req.params;
    const message = await service.deleteNews(id);
    res.status(201).json(message);
})

module.exports = router;