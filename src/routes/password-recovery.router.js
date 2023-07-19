const express = require('express');
const routes = express.Router();
const passport = require('passport');

const sendEmail = require('../utils/nodemailer');
const generate = require('../utils/random-password');
const UsersService = require('../services/users.service');

const service = new UsersService();

routes.post('/',
  passport.authenticate('local', { session: false}), 
  async (req, res, next) => {
    const user = req.user; 
    const randomPassword = generate();
    const nodemailer = sendEmail(user.email, randomPassword);

})

