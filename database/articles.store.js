const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const ArticlesModel = require("../models/articles.model");
require("../models/comments.model");

class ArticlesColletion {
  async getAllArticles() {
    const articles = await ArticlesModel.find().populate('comments').exec();
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
    await ArticlesModel.create({
      ...newData,
      createdAt: new Date(),
    });
  }

  async updateArticle(id, changes) {
    const updatedArticle = await ArticlesModel.findOneAndUpdate({
      id, 
      title: changes.title,
      author: changes.author,
      content: changes.content,
      updatedAt: new Date(),
      $push: { comments: changes.comments }
    });
    return updatedArticle;
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
