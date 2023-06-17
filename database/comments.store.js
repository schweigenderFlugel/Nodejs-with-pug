const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const CommentsModel = require("../models/comments.model");
const ArticlesModel = require("../models/articles.model");

class CommentsColletion {
  async getAllComments() {
    const comments = await CommentsModel.find().populate('article').exec();
    if (comments.length === 0) {
      return boom.notFound("No data in the database");
    }
    return comments;
  }

  async getCommentById(id) {
    const valid = mongoose.isValidObjectId(id);
    if (valid) {
      const comment = await CommentsModel.findById(id)
        .populate('articles');
      return comment;
    }
    return boom.notFound("ObjectId invalid!");
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
    return boom.notFound("ObjectId invalid!");
  }
}

module.exports = CommentsColletion;
