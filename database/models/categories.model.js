const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const CategoriesModel = mongoose.model('Categories', CategoriesSchema);
module.exports = CategoriesModel;