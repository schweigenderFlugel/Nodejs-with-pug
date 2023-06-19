const CommentsColletion = require("../database/store/comments.store");

const collection = new CommentsColletion();

class CommentsService {
  constructor() {}

  async getComments() {
    const data = await collection.getAllComments();
    return data;
  }

  async getCommentById(id) {
    const data = await collection.getCommentById(id);
    return data;
  }

  async createComments(newData) {
    await collection.createComment(newData);
    return newData;
  }

  async updateComments(id) {
    const message = await collection.updateComment(id);
    return message;
  }

  async deleteComments(id) {
    const message = await collection.deleteComment(id);
    return message;
  }
}

module.exports = CommentsService;