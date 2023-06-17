const express = require("express");
const routes = express.Router();
const CategoriesService = require('../services/categories.service');

const service = new CategoriesService();

routes.get("/", async (req, res ,next) => {
  const categories = await service.getCategories();
  res.status(201).json(categories)
})

routes.get("/:id", async (req, res ,next) => {
  const id  = req.params.id;
  const category = await service.getCategoryById(id);
  res.status(201).json(category)
})

routes.post("/", async (req, res, next) => {
    const newData = req.body;
    const newCategory = await service.createCategories(newData);
    res.status(201).json(newCategory);
});

routes.patch("/:id", async (req, res, next) => {
  const { id } = req.params.id;
  const changes = req.body;
  const newCategory = await service.updateCategories(id, changes);
  res.status(201).json(newCategory);
});

routes.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const message = await service.deleteCategories(id);
  res.status(201).json(message);
})

module.exports = routes;