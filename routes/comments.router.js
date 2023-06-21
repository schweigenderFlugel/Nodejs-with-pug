const express = require("express");
const routes = express.Router();
const CommentsService = require('../services/comments.service');

const service = new CommentsService();

routes.get("/", async (req, res ,next) => {
  try {
    const articles = await service.getComments();
    res.status(201).json(articles)
  } catch (error) {
      next(error);
  }
})

routes.get("/:id", async (req, res ,next) => {
  try {
    const id  = req.params.id;
    const article = await service.getCommentById(id);
    res.status(201).json(article)
  } catch (error) {
      next(error);
  }
});

routes.post("/", async (req, res, next) => {
    const newData = req.body;
    const newArticle = await service.createComments(newData);
    res.status(201).json(newArticle);
});

routes.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const changes = req.body;
    const newArticle = await service.updateComments(id, changes);
    res.status(201).json(newArticle);
  } catch (error) {
      next(error)
  }
});

routes.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await service.deleteComments(id);
    res.status(201).json(message);
  } catch (error) {
      next(error)
  }
})

module.exports = routes;
