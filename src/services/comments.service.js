const boom = require("@hapi/boom");
const CommentsColletion = require("../database/store/comments.store");

const collection = new CommentsColletion();

class CommentsService {
  
  async getComments() {
    const comments = await collection.getAllComments();
    if (comments.length === 0) {
      throw boom.notFound("No Comments");
    }
    return comments;
  }

  async getCommentById(id) {
    const comment = await collection.getCommentById(id);
    if (!comment) {
      throw boom.notFound("Comment Not Found!");
    }
    return comment;
  }

  async createComments(newData) {
    await collection.createComment(newData);
    return newData;
  }

  async updateComments(id) {
    const updatedComment = await collection.updateComment(id);
    if (!updatedComment) {
      throw boom.notFound('Comment Not Found!');
    }
    return updatedComment;
  }

  async deleteComments(id) {
    const deletedComment = await collection.deleteComment(id);
    if (!deletedComment) {
      throw boom.notFound('Comment Not Found!');
    }
    return deletedComment;
  }
}

module.exports = CommentsService;