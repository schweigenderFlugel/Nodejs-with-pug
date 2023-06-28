const Joi = require('joi'); 

const id = Joi.string();
const content = Joi.string().max(50);
const user = Joi.string().max(20);
const article = Joi.string().min(20);

const createCommentSchema = Joi.object({
    content: content.required(),
    user: user.required(),
    article: article.required(),
});

const updateCommentSchema = Joi.object({
    content: content, 
    user: user,
    article: article
});

module.exports = { createCommentSchema, updateCommentSchema }