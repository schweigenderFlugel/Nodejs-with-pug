const express = require("express");
const passport = require("passport");

const ArticlesService = require("../services/articles.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createArticleSchema, updateArticleSchema } = require("../schemas/articles.schema");
const { checkRoles } = require('../middlewares/auth.handler');

const routes = express.Router();
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
 *          $ref: '#/components/schemas/comments'
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
 *              type: array
 *              $ref: '#/components/schemas/articles'
 */
routes.get("/", 
  passport.authenticate('jwt', { session: false }), 
  checkRoles('reader', 'writer', 'admin'), 
  async (req, res, next) => {
    try {
      const articles = await service.getArticles();
      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }
);

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
 *        description: the article id
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
routes.get("/:id",
  passport.authenticate('jwt', { session: false }), 
  checkRoles('reader', 'writer', 'admin'), 
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const article = await service.getArticleById(id);
      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }
);

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
 *      201:
 *        description: new article created
 */
routes.post("/",
  passport.authenticate('jwt', { session: false }), 
  checkRoles('writer', 'admin'), 
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
 *      201:
 *        description: the article was updated
 *      404: 
 *        description: article not found
 */
routes.patch("/:id",
  passport.authenticate('jwt', { session: false }), 
  checkRoles('reader', 'writer', 'admin'), 
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
 *      201:
 *        description: the article was deleted
 *      404: 
 *        description: article not found
 */
routes.delete("/:id",
  passport.authenticate('jwt', { session: false }), 
  checkRoles('writer', 'admin'), 
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await service.deleteArticles(id);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
