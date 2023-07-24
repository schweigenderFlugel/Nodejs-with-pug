const ArticlesService = require("../services/articles.service");
const service = new ArticlesService();

const getArticles = async () => {
  return service.getArticles();
};

const getArticleById = async (_, { id }) => {
  return service.getArticleById(id);
};

const createArticles = async (_, { dto }) => {
  return service.createArticles(dto);
};

const updateArticles = async (_, { id, dto }) => {
  return service.updateArticles(id, dto);
};

const deleteArticles = async (_, { id }) => {
  const product = await service.deleteArticles(id);
  return product;
};

module.exports = {
  getArticles,
  getArticleById,
  createArticles,
  updateArticles,
  deleteArticles,
};
