const express = require("express");
const routes = express.Router();
const ArticlesService = require("../services/articles.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createArticleSchema, updateArticleSchema } = require("../schemas/articles.schema");

const service = new ArticlesService();

/**
 * @swagger
 * components:
 *  schemas:
 *    articles:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: the article title
 *        author:
 *          type: string
 *          description: information of the author
 *        createdAt:
 *          type: string
 *          description: date of publication created automatically
 *        updatedAt:
 *          type: string
 *          description: date of update created automatically
 *        content:
 *          type: string
 *          description: content of the article
 *        isBlocked:
 *          type: string
 *          description: is the article blocked or not?
 *        categories:
 *          type: array
 *          description: categories for the article
 *        comments:
 *          type: array
 *          description: comments about the article
 *      required:
 *        - title
 *        - author
 *        - content
 *      example:
 *        - title: Nada nuevo
 *        - author: Facundo
 *        - content: Ante el repentino silencia ciertas voces...
 */
/**
 * @swagger
 * /v1/api/articles:
 *  get:
 *    summary: return a published article
 *    tags: [Articles]
 *    responses:
 *      200:
 *        description: list of articles
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/articles'
 */
routes.get("/", async (req, res, next) => {
  try {
    const articles = await service.getArticles();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /v1/api/articles/{id}:
 *  get:
 *    summary: return all published articles
 *    tags: [Articles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: the article id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/articles'
 *      404: 
 *        description: article not found
 */
routes.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await service.getArticleById(id);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /v1/api/articles:
 *  post:
 *    summary: create a new article
 *    tags: [Articles]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/articles'
 *    responses:
 *      200:
 *        description: new user created
 */
routes.post(
  "/",
  validatorHandler(createArticleSchema, "body"),
  async (req, res, next) => {
    const newData = req.body;
    const newArticle = await service.createArticles(newData);
    res.status(201).json(newArticle);
  }
);

/**
 * @swagger
 * /v1/api/articles/{id}:
 *  patch:
 *    summary: update an article
 *    tags: [Articles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: the user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/articles'
 *    responses:
 *      200:
 *        description: the article was updated
 *      404: 
 *        description: article not found
 */
routes.patch(
  "/:id",
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

/**
 * @swagger
 * /v1/api/articles/{id}:
 *  delete:
 *    summary: delete an article
 *    tags: [Articles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: the article was deleted
 *      404: 
 *        description: article not found
 */
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
