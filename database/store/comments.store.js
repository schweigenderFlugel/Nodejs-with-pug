const mongoose = require('mongoose');
const { CommentsModel } = require('./connection');

class CommentsColletion {
  async getAllComments() {
    const comments = await CommentsModel.find()
      .populate({ path: 'article', select: 'title' })
      .exec();
    return comments;
  }

  async getCommentById(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      const comment = await CommentsModel.findById(id)
        .populate('article')
        .exec();
      return comment;
    }
  }

  async createComment(newData) {
    await CommentsModel.create(newData);
  }

  async updateComment(id, changes) {
    await CommentsModel.findOneAndUpdate(id, changes);
    return "Modified successfully";
  }

  async deleteComment(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      await CommentsModel.deleteOne({ _id: id });
      return "Successfully erased";
    }
  };
};

module.exports = CommentsColletion;
