const boom = require("@hapi/boom");
const ArticlesColletion = require("../database/store/articles.store");

const collection = new ArticlesColletion();

class ArticlesService {
  async getArticles() {
    const articles = await collection.getAllArticles();
    if (articles.length === 0) {
      throw boom.notFound('no articles');
    }
    if (articles.isBlocked) {
      throw boom.notFound('no articles');
    }
    return articles;
  }

  async getArticleById(id) {
    const article = await collection.getArticleById(id);
    if (!article) {
      throw boom.notFound('Article not found!');
    }
    if (article.isBlocked){
      throw boom.unauthorized('No access to this article')
    }
    return article;
  }

  async createArticles(newData) {
    await collection.createArticle(newData);
    return newData;
  }

  async updateArticles(id, changes) {
    const updatedArticle = await collection.updateArticle(id, changes);
    if (!updatedArticle) {
      throw boom.notFound('Article not found!');
    }
    return updatedArticle;
  }

  async deleteArticles(id) {
    const message = await collection.deleteArticle(id);
    if (!message) {
      throw boom.notFound('Article not found!');
    }
    return message;
  }
}

module.exports = ArticlesService;
