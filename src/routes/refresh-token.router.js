const express = require("express");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const router = express.Router();

const config = require("../config/config");
const UsersService = require("../services/users.service");

const userService = new UsersService();

router.get("/", async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw boom.notFound("not found");
    const refreshToken = cookies.jwt;
    const foundUser = await userService.findUserByRefreshToken(refreshToken);
    if (!foundUser) throw boom.unauthorized("User not found");
    jwt.verify(refreshToken, config.jwtRefreshSecret, (err, decoded) => {
      if (err || foundUser.id !== decoded.sub) throw boom.unauthorized("no match");
      const accessToken = jwt.sign(
        {
          sub: decoded.sub,
          role: decoded.role,
        },
        config.jwtAccessSecret,
        { expiresIn: "30s" }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
