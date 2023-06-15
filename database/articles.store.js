const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const config = require("../config/config");
const ArticlesModel = require("../models/articles.model");

mongoose
  .connect(config.mongodbUri)
  .then(() => console.log("Connected to mongodb!"));

class ArticlesColletion {
  async getAllArticles() {
    const articles = await ArticlesModel.find();
    if (articles.length === 0) {
      return boom.notFound("No data in the database");
    }
    return articles;
  }

  async getArticleById(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      const article = await ArticlesModel.findById(id);
      return article;
    }
    return boom.notFound("ObjectId invalid!");
  }

  async createArticle(newData) {
    await ArticlesModel.create(newData);
  }

  async updateArticle(id, changes) {
    await ArticlesModel.findOneAndUpdate(id, changes);
    return "Modified successfully";
  }

  async deleteArticle(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await ArticlesModel.deleteOne({ _id: id });
      return "Successfully erased";
    } 
    return boom.notFound("ObjectId invalid!");
  }
}

module.exports = ArticlesColletion;
