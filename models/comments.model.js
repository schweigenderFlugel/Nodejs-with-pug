const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
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

const CommentsModel = mongoose.model('Comments', CommentsSchema);
module.exports = CommentsModel;