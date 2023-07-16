const mongoose = require('mongoose');
const { CommentModel } = require('./connection');

class CommentsColletion {
  async getAllComments() {
    const comments = await CommentModel.find()
      .populate({ path: 'article', select: 'title' })
      .exec();
    return comments;
  }

  async getCommentById(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      const comment = await CommentModel.findById(id)
        .populate('article')
        .exec();
      return comment;
    }
  }

  async createComment(newData) {
    await CommentModel.create(newData);
  }

  async updateComment(id, changes) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await CommentModel.findOneAndUpdate({
        id, 
        ...changes
      });
    }
    return "Successfully updated";
  }

  async deleteComment(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await CommentModel.deleteOne({ _id: id });
      return "Successfully erased";
    }
  };
};

module.exports = CommentsColletion;
