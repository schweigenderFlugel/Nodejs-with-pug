const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  content: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: true
  },
  author: {
    type: String,
    required: true 
  }, 
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  }]
});

const ArticlesModel = mongoose.model('Articles', ArticlesSchema);
module.exports = ArticlesModel;