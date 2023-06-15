const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true 
  }, 
  _articleId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'articles',
    }
  ]
});

const ArticlesModel = mongoose.model('Comments', CommentsSchema);
module.exports = ArticlesModel;