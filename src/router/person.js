'use strict';

const { Router } = require('express');
const PersonController = require('../controllers/person');
const isAuthenticated = require('../middleware/isAuthenticated');

const personRouter = Router();
personRouter.use(isAuthenticated);

personRouter.get('/:id', PersonController.getOne);
personRouter.post('/', PersonController.create); // person page
personRouter.post('/:personId', PersonController.createGift); //person to create gift
personRouter.patch('/:id', PersonController.update);
personRouter.delete('/:id', PersonController.deleteOne);

module.exports = personRouter;
