const express = require("express");
const routes = express.Router();
const CategoriesService = require('../services/categories.service');

const service = new CategoriesService();

routes.get("/", async (req, res ,next) => {
  try {
    const categories = await service.getCategories();
  res.status(201).json(categories)
  } catch (error) {
    next(error)
  }
})

routes.get("/:id", async (req, res ,next) => {
  try {
    const id  = req.params.id;
  const category = await service.getCategoryById(id);
  res.status(201).json(category)
  } catch (error) {
    next(error)
  }
  
})

routes.post("/", async (req, res, next) => {
  try {
    const newData = req.body;
    const newCategory = await service.createCategories(newData);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

routes.patch("/:id", async (req, res, next) => {
  const { id } = req.params.id;
  const changes = req.body;
  const newCategory = await service.updateCategories(id, changes);
  res.status(201).json(newCategory);
});

routes.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await service.deleteCategories(id);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = routes;