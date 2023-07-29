const { getArticles, getArticleById, createArticles, updateArticles, deleteArticles} = require('./articles.resolvers');
const { getComments, getCommentById } = require('./comments.resolvers');

const resolvers = {
    Query: {
        hello: () => "hola mundo",
        article: getArticleById,
        articles: getArticles,
        comments: getComments,
        comment: getCommentById
    },
    Mutation: {
        createArticles,
        updateArticles, 
        deleteArticles,
    }
}

module.exports = resolvers