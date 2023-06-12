const express = require("express");
const routes = express.Router();
const ArticlesService = require("../services/articles.services");

const service = new ArticlesService();

routes.get("/", async (req, res ,next) => {
  const articles = await service.getArticles();
  res.status(201).json(articles)
})

routes.post("/", async (req, res, next) => {
  const newData = req.body;
  const newArticle = await service.createArticles(newData);
  res.status(201).json(newArticle);
});

routes.patch("/:id", async (req, res, next) => {
  const { id } = req.params.id;
  const changes = req.body;
  const newArticle = await service.updateArticles(id, changes);
  res.status(201).json(newArticle);
});

module.exports = routes;
