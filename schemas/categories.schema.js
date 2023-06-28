const Joi = require('joi'); 

const name = Joi.string().max(20);
const description = Joi.string();

const createArticleSchema = Joi.object({
    name: name.required(),
    description: description.required(),
});

module.exports = { createArticleSchema };