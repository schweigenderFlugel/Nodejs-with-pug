const boom = require("@hapi/boom");
const mongoose = require('mongoose');
const { ArticlesModel } = require('./connection');

class ArticlesColletion {
  async getAllArticles() {
    const articles = await ArticlesModel.find()
      .populate({ path: "comments" })
      .populate({ path: "categories", select: 'name'})
      .limit(5)
    if (articles.length === 0) {
      return boom.badRequest("ObjectId invalid!");
    }
    return articles;
  }

  async getArticleById(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      const article = await ArticlesModel.findById(id)
        .populate({ path: "comments", select: 'content' })
        .populate({ path: "categories", select: 'name'})
        .exec();
      return article;
    }
    return boom.badRequest("ObjectId invalid!");
  }

  async createArticle(newData) {
    await ArticlesModel.create({
      ...newData,
      createdAt: new Date(),
    });
  }

  async updateArticle(id, changes) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      const updatedArticle = await ArticlesModel.findOneAndUpdate({
        id,
        title: changes.title,
        author: changes.author,
        content: changes.content,
        updatedAt: new Date(),
        $push: { comments: changes.comments, categories: changes.categories },
      });
      return updatedArticle;
    }
    return boom.badRequest("ObjectId invalid!");
  }

  async deleteArticle(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await ArticlesModel.deleteOne({ _id: id });
      return "Successfully erased";
    }
    return boom.badRequest("ObjectId invalid!");
  }
}

module.exports = ArticlesColletion;
