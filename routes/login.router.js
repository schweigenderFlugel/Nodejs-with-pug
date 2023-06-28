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
      const acesssToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '30m'});
      res.json({
        email: user.email,
        username: user.username,
        role: user.role,
        acesssToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
