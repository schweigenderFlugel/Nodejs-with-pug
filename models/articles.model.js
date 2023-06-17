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
  },
  updatedAt: {
    type: Date,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true 
  }, 
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  }]
});

const ArticlesModel = mongoose.model('Articles', ArticlesSchema);
module.exports = ArticlesModel;