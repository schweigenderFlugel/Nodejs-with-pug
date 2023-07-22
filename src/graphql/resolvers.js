const { 
    getArticles, 
    getArticleById, 
    createArticles, 
    updateArticles, 
    deleteArticles
} = require('./articles.resolvers');

const resolvers = {
    Query: {
        hello: () => "hola mundo",
        article: getArticleById,
        articles: getArticles,
    },
    Mutation: {
        createArticles,
        updateArticles, 
        deleteArticles,
    }
}

module.exports = resolvers