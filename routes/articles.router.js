const express = require("express");
const routes = express.Router();
const ArticlesService = require("../services/articles.services");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createArticleSchema,
  updateArticleSchema,
} = require("../schemas/articles.schema");

const service = new ArticlesService();

routes.get("/", async (req, res, next) => {
  try {
    const articles = await service.getArticles();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
});

routes.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await service.getArticleById(id);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
});

routes.post(
  "/",
  validatorHandler(createArticleSchema, "body"),
  async (req, res, next) => {
    const newData = req.body;
    const newArticle = await service.createArticles(newData);
    res.status(201).json(newArticle);
  }
);

routes.patch("/:id",
  validatorHandler(updateArticleSchema, "body"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const modifiedArticle = await service.updateArticles(id, changes);
      res.status(201).json(modifiedArticle);
    } catch (error) {
      next(error);
    }
  }
);

routes.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await service.deleteArticles(id);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
