const ArticlesColletion = require("../database/connection");
const boom = require("@hapi/boom");

const collection = new ArticlesColletion();

class ArticlesService {
  constructor() {}

  async getArticles() {
    const getAllArticles = await collection.getAllArticles();
    return getAllArticles;
  }

  async createArticles(newData) {
    await collection.insertArticle(newData);
    return newData;
  }

  async updateArticles(id, changes) {
    await collection.updateArticle(id, changes);
    return changes;
  }

  async deleteArticle(id) {
    await collection.deleteArticle(id);
  }
}

module.exports = ArticlesService;
