const Joi = require('joi'); 

const title = Joi.string().max(50);
const author = Joi.string().max(20);
const content = Joi.string().min(20);

const createArticleSchema = Joi.object({
    title: title.required(),
    author: author.required(),
    content: content.required(), 
}) 

const updateArticleSchema = Joi.object({
    title: title,
    author: author,
    content: content, 
})

module.exports = { createArticleSchema, updateArticleSchema }