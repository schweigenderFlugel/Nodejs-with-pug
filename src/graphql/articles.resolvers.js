const ArticlesService = require('../services/articles.service');
const service = new ArticlesService();

const getArticles =  (_, { id }) => {
    return service.getArticles(id);
  }
  
  const getArticleById = () => {
    return service.getArticleById({});
  }
  
  const createArticles = async (_, { dto }) => {
    return service.createArticles(dto);
  }
  
  const updateArticles = async (_, { id, dto }) => {
    return service.updateArticles(id, dto)
  }

  const deleteArticles = async (_, { id }) => {
    const product = await service.deleteArticles(id);
    return product;
  };
  
  module.exports = { getArticles, getArticleById, createArticles, updateArticles, deleteArticles }
  