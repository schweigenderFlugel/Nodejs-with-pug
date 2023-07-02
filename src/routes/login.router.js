const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const config = require("../config/config");

router.post("/",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const accessToken = jwt.sign(payload, config.jwtAccessSecret, { expiresIn: '30m'});
      const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: "1d" });
      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
      res.json({
        email: user.email,
        username: user.username,
        role: user.role,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
