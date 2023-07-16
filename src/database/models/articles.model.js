const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
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
  createdAt: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  }]
});

const ArticleModel = mongoose.model('Articles', articleSchema);
module.exports = ArticleModel;