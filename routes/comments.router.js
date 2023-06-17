const express = require("express");
const routes = express.Router();
const CommentsService = require('../services/comments.service');

const service = new CommentsService();

routes.get("/", async (req, res ,next) => {
  const articles = await service.getComments();
  res.status(201).json(articles)
})

routes.get("/:id", async (req, res ,next) => {
  const id  = req.params.id;
  const article = await service.getCommentById(id);
  res.status(201).json(article)
})

routes.post("/", async (req, res, next) => {
    const newData = req.body;
    const newArticle = await service.createComments(newData);
    res.status(201).json(newArticle);
});

routes.patch("/:id", async (req, res, next) => {
  const { id } = req.params.id;
  const changes = req.body;
  const newArticle = await service.updateComments(id, changes);
  res.status(201).json(newArticle);
});

routes.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const message = await service.deleteComments(id);
  res.status(201).json(message);
})

module.exports = routes;
