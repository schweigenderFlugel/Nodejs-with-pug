const Joi = require('joi'); 

const username = Joi.string().min(8).max(20);
const email = Joi.string();
const password = Joi.string().min(10).max(30);
const role = Joi.string();

const createUserSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
});

const updateUserSchema = Joi.object({
    username: username,
    email: email,
    password: password,
    role: role,
})

module.exports = { createUserSchema };