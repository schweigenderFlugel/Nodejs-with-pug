const express = require("express");
const passport = require("passport");

const validatorHandler = require("../middlewares/validator.handler");
const CategoriesService = require("../services/categories.service");
const { createArticleSchema, updateArticleSchema } = require('../schemas/categories.schema');
const { checkRoles } = require('../middlewares/auth.handler')

const routes = express.Router();

const service = new CategoriesService();

/**
 * @swagger
 * components:
 *  schemas:
 *    categories:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the article title
 *        description:
 *          type: string
 *          description: information of the author
 *      required:
 *        - name
 *        - description
 *      example:
 *        - name: poetry
 *        - author: somebody's name
 */
/**
 * @swagger
 * /v1/api/categories:
 *  get:
 *    summary: return all categories
 *    tags: [Categories]
 *    responses:
 *      200:
 *        description: list of categories
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/categories'
 */
routes.get("/",
  passport.authenticate('jwt', { session: false }), 
  checkRoles('reader', 'writer', 'admin'), 
    async (req, res, next) => {
    try {
      const categories = await service.getCategories();
      res.status(201).json(categories);
    } catch (error) {
    next(error);
    }
  }
);

/**
 * @swagger
 * /v1/api/categories/{id}:
 *  get:
 *    summary: return a category
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: the category id
 *    responses:
 *      200:
 *        description: the category id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/categories'
 *      404: 
 *        description: category not found
 */
routes.get("/:id", 
  passport.authenticate('jwt', { session: false }), 
  checkRoles('reader', 'writer', 'admin'), 
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const category = await service.getCategoryById(id);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /v1/api/categories:
 *  post:
 *    summary: create a new category
 *    tags: [Categories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/categories'
 *    responses:
 *      200:
 *        description: new user created
 */
routes.post("/", 
  passport.authenticate('jwt', { session: false }), 
  checkRoles('admin'), 
  validatorHandler(createArticleSchema, 'body'), 
  async (req, res, next) => {
    try {
      const newData = req.body;
      const newCategory = await service.createCategories(newData);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /v1/api/categories/{id}:
 *  patch:
 *    summary: update a category
 *    tags: [Categories]
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
 *            $ref: '#/components/schemas/categories'
 *    responses:
 *      200:
 *        description: the category was updated
 *      404: 
 *        description: category not found
 */
routes.patch("/:id", 
  passport.authenticate('jwt', { session: false }), 
  checkRoles('admin'), 
  validatorHandler(updateArticleSchema, 'body'), 
  async (req, res, next) => {
    const id = req.params.id;
    const changes = req.body;
    const newCategory = await service.updateCategories(id, changes);
    res.status(201).json(newCategory);
  }
);

/**
 * @swagger
 * /v1/api/categories/{id}:
 *  delete:
 *    summary: delete an category
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *      200:
 *        description: the category was deleted
 *      404: 
 *        description: category not found
 */
routes.delete("/:id", 
  passport.authenticate('jwt', { session: false }), 
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const message = await service.deleteCategories(id);
      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routes;
