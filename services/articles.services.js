const ArticlesColletion = require("../database/store/articles.store");

const collection = new ArticlesColletion();

class ArticlesService {
  constructor() {}

  async getArticles() {
    const data = await collection.getAllArticles();
    return data;
  }

  async getArticleById(id) {
    const data = await collection.getArticleById(id);
    return data;
  }

  async createArticles(newData) {
    await collection.createArticle(newData);
    return newData;
  }

  async updateArticles(id, changes) {
    const message = await collection.updateArticle(id, changes);
    return message;
  }

  async deleteArticles(id) {
    const message = await collection.deleteArticle(id);
    return message;
  }
}

module.exports = ArticlesService;
