const mongoose = require("mongoose");
const config = require("../../config/config");

const ArticlesModel = require("../models/articles.model");
const CommentsModel =  require("../models/comments.model");
const CategoriesModel = require("../models/categories.model");
const UsersModel = require("../models/users.model");

mongoose
  .connect(config.mongodbUri)
  .then(() => console.log("Connected to mongodb!"))
  .catch((err) => console.error(err));

module.exports = { ArticlesModel, CommentsModel, CategoriesModel, UsersModel };