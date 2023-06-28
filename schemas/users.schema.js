const Joi = require('joi'); 

const name = Joi.string().max(20);
const last_name = Joi.string().max(20);
const age = Joi.number().integer();
const username = Joi.string().min(8).max(20);
const password = Joi.string().min(10).max(30);

const createUserSchema = Joi.object({
    name: name.required(),
    last_name: last_name.required(),
    age: age.required(),
    username: username.required(),
    password: password.required(),
});

module.exports = { createUserSchema };