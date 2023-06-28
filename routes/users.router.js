const express = require("express");
const passport = require('passport');

const UsersService = require("../services/users.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createUserSchema } = require("../schemas/users.schema");
const { checkUserById } = require('../middlewares/auth.handler');

const routes = express.Router();
const service = new UsersService();

routes.post("/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    const newData = req.body;
    const newUser = await service.createUser(newData);
    delete newUser.password;
    res.status(201).json(newUser);
  }
);

routes.post("/mongodb",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const newData = req.body;
      const newUser = await service.createUsersInMongodb(newData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

routes.patch("/mongodb/:id",
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const modifiedPassword = await service.updatePassword(id, changes);
      res.status(201).json(modifiedPassword);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routes;
