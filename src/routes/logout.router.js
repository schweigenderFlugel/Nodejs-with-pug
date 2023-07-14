const express = require("express");
const boom = require("@hapi/boom");
const router = express.Router();

const UsersService = require("../services/users.service");
const userService = new UsersService();

router.get("/", async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw boom.notFound('not found');
    const refreshToken = cookies.jwt;
    const foundUser = await userService.findUserByRefreshToken(refreshToken);
    if (foundUser.refreshToken === refreshToken) {
      foundUser.refreshToken = null;
      await userService.saveRefreshToken(
        foundUser.email,
        foundUser.refreshToken
      );
      res.clearCookie("jwt", { httpOnly: true });
      res.status(204).json("token erased");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
