const express = require("express");
const routes = express.Router();
const ArticlesService = require("../services/articles.services");

const service = new ArticlesService();

routes.post("/", async (req, res, next) => {
  const newData = req.body;
  const newArticle = await service.createArticles(newData);
  res.status(201).json(newArticle);
});

module.exports = routes;
