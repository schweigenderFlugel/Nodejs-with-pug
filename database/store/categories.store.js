const boom = require("@hapi/boom");
const mongoose = require('mongoose');
const { CategoriesModel } = require('./connection')

class CategoriesCollection {
  async getAllCategories() {
    const categories = await CategoriesModel.find();
    if (categories === 0) {
      return boom.badRequest("ObjectId invalid!");
    }
    return categories;
  }

  async getCategoryById(id) {
    const valid = await mongoose.isValidObjectId(id);
    if (valid) {
      const category = await CategoriesModel.findById(id);
      return category;
    }
  }

  async createCategory(newData) {
    const newCategory = await CategoriesModel.create(newData);
    return newCategory;
  }

  async deleteCategory(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await CategoriesModel.deleteOne({ _id: id });
      return "Successfully erased";
    }
    return boom.badRequest("ObjectId invalid!");
  }
}

module.exports = CategoriesCollection;
