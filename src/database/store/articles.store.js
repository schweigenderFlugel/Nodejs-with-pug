const mongoose = require('mongoose');
const { ArticleModel } = require('./connection');

class ArticlesColletion {
  async getAllArticles() {
    const articles = await ArticleModel
      .where({ isBlocked: false })
      .populate({ path: "comments", select: 'content' })
      .populate({ path: "categories", select: 'name' })
      .limit(5)
    return articles;
  }

  async getArticleById(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      const article = await ArticleModel.findById(id)
        .populate({ path: "comments", select: 'content' })
        .populate({ path: "categories", select: 'name'})
      return article;
    }
  }

  async createArticle(newData) {
    await ArticleModel.create({
      ...newData,
    });
    return "Article created successfully"
  }

  async updateArticle(id, changes) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await ArticleModel.findOneAndUpdate({
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
      await ArticleModel.deleteOne({ _id: id })
      return 'Successfully erased'
    }
  }
}

module.exports = ArticlesColletion;
