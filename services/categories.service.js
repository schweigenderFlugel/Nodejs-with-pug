const boom = require("@hapi/boom");
const CategoriesCollection = require("../database/store/categories.store");

const collection = new CategoriesCollection();

class CategoriesService {
  async getCategories() {
    const categories = await collection.getAllCategories();
    if (categories === 0) {
      throw boom.notFound('No Categories Found!');
    }
    return categories;
  }

  async getCategoryById(id) {
    const category = await collection.getArticleById(id);
    if (!category) {
      throw boom.notFound('Category Not Found!')
    }
    return data;
  }

  async createCategories(newData) {
    await collection.createCategory(newData);
    return newData;
  }

  async deleteCategories(id) {
    const deletedCategory = await collection.deleteCategory(id);
    if (!category) {
      throw boom.notFound('Category Not Found!')
    }
    return deletedCategory;
  }
}

module.exports = CategoriesService;
