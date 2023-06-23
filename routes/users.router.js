const express = require("express");
const UsersService = require("../services/users.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createUserSchema } = require("../schemas/users.schema");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res, next) => {
  const users = await service.getUsers();
  res.status(200).json(users);
});

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    const newData = req.body;
    const newUser = await service.createUser(newData);
    delete newUser.password;
    res.status(201).json(newUser);
  }
);

router.post("/mongodb",
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

module.exports = router;
