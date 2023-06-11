const ArticlesColletion = require("../database/connection");
const boom = require("@hapi/boom");

const collection = new ArticlesColletion();

class ArticlesService {
  constructor() {}

  async createArticles(newData) {
    const newArticle = await collection.insertArticle({ ...newData });
    return newData;
  }
}

module.exports = ArticlesService;
