const express = require("express");
const routes = express.Router();

const PasswordRecoveryService = require("../services/password-recovery.service");

const service = new PasswordRecoveryService();

routes.post("/send-email", async (req, res, next) => {
  const { email } = req.body;
  const recovery = await service.sendRecovery(email);
  res.status(201).json(recovery);
});

routes.post("/new-password", async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const modifiedPassword =  await service.changePassword(token, password);
    res.status(201).json(modifiedPassword);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
