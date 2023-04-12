'use strict';

const { Router } = require('express');
const PersonController = require('../controllers/person');
const isAuthenticated = require('../middleware/isAuthenticated');

const personRouter = Router();

personRouter.get('/', PersonController.getAll);
personRouter.get('/:id', PersonController.getOne);

personRouter.use(isAuthenticated);
personRouter.post('/', PersonController.create); // person page
personRouter.post('/:personId', PersonController.createGift); //person to create gift
personRouter.put('/:id', PersonController.replace);
personRouter.patch('/:id', PersonController.update);
personRouter.delete('/:id', PersonController.deleteOne);

module.exports = personRouter;
