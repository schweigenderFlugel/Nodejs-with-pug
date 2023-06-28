const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  }, 
  article: [{
      type: Schema.Types.ObjectId, 
      ref: 'Articles' 
    }]
});

const CommentModel = mongoose.model('Comments', commentSchema);
module.exports = CommentModel;