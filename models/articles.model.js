const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true 
  }, 
  content: {
    type: String,
    required: true,
  },
});

const ArticlesModel = mongoose.model('Articles', ArticlesSchema);
module.exports = ArticlesModel;