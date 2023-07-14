const mongoose = require("mongoose");
const config = require("../../config/config");
const boom = require('@hapi/boom');

const ArticleModel = require("../models/articles.model");
const CommentModel =  require("../models/comments.model");
const CategoryModel = require("../models/categories.model");
const UserModel = require("../models/users.model");

mongoose
  .connect(config.mongodbUri)
  .then(() => console.log("Connected to mongodb!"))
  .catch((err) => {
    throw boom.internal(err)
  });

module.exports = { ArticleModel, CommentModel, CategoryModel, UserModel };