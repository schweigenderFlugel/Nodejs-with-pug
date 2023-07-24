const express = require("express");
const passport = require('passport');

const UsersService = require("../services/users.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createUserSchema } = require("../schemas/users.schema");

const router = express.Router();
const service = new UsersService();

router.post("/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const newData = req.body;
      const newUser = await service.createUser(newData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id",
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const { password } = req.body;
      const modifiedPassword = await service.updatePassword(id, password);
      res.status(201).json(modifiedPassword);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
