const mongoose = require('mongoose');
const { ArticlesModel } = require('./connection');

class ArticlesColletion {
  async getAllArticles() {
    const articles = await ArticlesModel.find()
      .populate({ path: "comments" })
      .populate({ path: "categories", select: 'name'})
      .limit(5)
    return articles;
  }

  async getArticleById(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      const article = await ArticlesModel.findById(id)
        .populate({ path: "comments", select: 'content' })
        .populate({ path: "categories", select: 'name'})
      return article;
    }
  }

  async createArticle(newData) {
    await ArticlesModel.create({
      ...newData,
    });
  }

  async updateArticle(id, changes) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await ArticlesModel.findOneAndUpdate({
        id,
        title: changes.title,
        author: changes.author,
        content: changes.content,
        updatedAt: new Date(),
        isBlocked: changes.isBlocked,
        $push: { comments: changes.comments, categories: changes.categories },
      });
      return 'Successfully updated';
    }
  }

  async deleteArticle(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await ArticlesModel.deleteOne({ _id: id })
      return 'Successfully erased'
    }
  }
}

module.exports = ArticlesColletion;
