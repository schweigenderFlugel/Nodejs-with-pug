const express = require("express");
const passport = require("passport");

const CommentsService = require('../services/comments.service');
const validatorHandler = require("../middlewares/validator.handler");
const { createCommentSchema, updateCommentSchema } = require('../schemas/comments.schema');
const { checkRoles } = require('../middlewares/auth.handler')

const routes = express.Router();
const service = new CommentsService();

/**
 * @swagger
 * components:
 *  schemas:
 *    comments:
 *      type: object
 *      properties:
 *        content:
 *          type: string
 *          description: comments
 *        user:
 *          type: string
 *          description: information of the author
 *        article:
 *          type: array
 *          description: id of the article commented 
 *      required:
 *        - content
 *        - user
 *        - article
 *      example: 
 *        - content: Falta estructura
 *        - user: Facundo 
 */
/**
 * @swagger
 * /v1/api/comments:
 *  get:
 *    summary: return all comments
 *    tags: [Comments]
 *    responses:
 *      200:
 *        description: list of comments
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/comments'
 */
routes.get("/", 
  passport.authenticate('jwt', { session: false }),
  checkRoles('reader', 'writer', 'admin'),
  async (req, res ,next) => {
  try {
    const articles = await service.getComments();
    res.status(201).json(articles)
  } catch (error) {
      next(error);
  }
})

/**
 * @swagger
 * /v1/api/comments/{id}:
 *  get:
 *    summary: return a comment
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: the comment id
 *    responses:
 *      200:
 *        description: the comment id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/comments'
 *      404: 
 *        description: article not found
 */
routes.get("/:id", 
  passport.authenticate('jwt', { session: false }),
  checkRoles('reader', 'writer', 'admin'),
  async (req, res ,next) => {
    try {
      const id  = req.params.id;
      const article = await service.getCommentById(id);
      res.status(201).json(article)
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /v1/api/comments:
 *  post:
 *    summary: create a new comment
 *    tags: [Comments]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/comments'
 *    responses:
 *      201:
 *        description: new comment created
 */
routes.post("/",
  passport.authenticate('jwt', { session: false }),
  checkRoles('reader', 'writer', 'admin'),
  validatorHandler(createCommentSchema, 'body'), 
  async (req, res, next) => {
    const newData = req.body;
    const newComment = await service.createComments(newData);
    res.status(201).json(newComment);
});

/**
 * @swagger
 * /v1/api/comments/{id}:
 *  patch:
 *    summary: update an article
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: the comment id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/comments'
 *    responses:
 *      201:
 *        description: the comment was updated
 *      404: 
 *        description: comment not found
 */
routes.patch("/:id", 
  passport.authenticate('jwt', { session: false }),
  checkRoles('reader', 'writer', 'admin'),
  validatorHandler(createCommentSchema, 'body'), 
  async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const changes = req.body;
    const newArticle = await service.updateComments(id, changes);
    res.status(201).json(newArticle);
  } catch (error) {
      next(error)
  }
});

/**
 * @swagger
 * /v1/api/comments/{id}:
 *  delete:
 *    summary: delete a comment
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: the comment id
 *    responses:
 *      201:
 *        description: the comment was deleted
 *      404: 
 *        description: comment not found
 */
routes.delete("/:id", 
  passport.authenticate('jwt', { session: false }), 
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await service.deleteComments(id);
    res.status(201).json(message);
  } catch (error) {
      next(error)
  }
})

module.exports = routes;
