const mongoose = require('mongoose');
const { CategoryModel } = require('./connection')

class CategoriesCollection {
  async getAllCategories() {
    const categories = await CategoryModel.find();
    return categories;
  }

  async getCategoryById(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      const category = await CategoryModel.findById(id);
      return category;
    }
  }

  async createCategory(newData) {
    const newCategory = await CategoryModel.create(newData);
    return newCategory;
  }

  async updateCategory(id, changes) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await CategoryModel.findOneAndUpdate({
        id,
        ...changes
      })
      return 'Successfully updated';
    }
  }

  async deleteCategory(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await CategoryModel.deleteOne({ _id: id });
      return "Successfully erased";
    }
    return boom.badRequest("ObjectId invalid!");
  }
}

module.exports = CategoriesCollection;
