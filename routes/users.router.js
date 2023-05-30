const express = require('express');
const boom = require('@hapi/boom');
const UsersService = require('../services/users.service');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
    const users = await service.getUsers();
    res.status(200).json(users);
})

router.post('/', async (req, res, next) => {
    const newData = req.body;
    const newUser = await service.createUser(newData);
    res.status(201).json(newUser)
})

module.exports = router;