const CategoriesCollection = require("../database/store/categories.store");

const collection = new CategoriesCollection();

class CategoriesService {
  constructor() {}

  async getCategories() {
    const data = await collection.getAllCategories();
    return data;
  }

  async getCategoryById(id) {
    const data = await collection.getArticleById(id);
    return data;
  }

  async createCategories(newData) {
    await collection.createCategory(newData);
    return newData;
  }

  async deleteArticles(id) {
    const message = await collection.deleteCategory(id);
    return message;
  }
}

module.exports = CategoriesService;
