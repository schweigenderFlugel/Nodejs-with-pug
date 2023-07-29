const CommentsService = require('../services/comments.service');
const service = new CommentsService();

const getComments = async () => {
    return service.getComments();
};
  
const getCommentById = async (_, { id }) => {
    return service.getCommentById(id);
};

module.exports = {
    getComments,
    getCommentById
}