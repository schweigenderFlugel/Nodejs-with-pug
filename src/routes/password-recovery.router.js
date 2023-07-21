const express = require('express');
const routes = express.Router();
const passport = require('passport');

const sendMail = require('../utils/nodemailer');
const generate = require('../utils/random-password');
const UsersService = require('../services/users.service');

const service = new UsersService();

routes.get('/', async (req, res, next) => {
    const { email } = req.params;
    const randomPassword = generate();
    const nodemailer = sendMail(email, randomPassword);
    res.status(201).json(nodemailer);
})

module.exports = routes;
