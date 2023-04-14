'use strict';

const { Router } = require('express');
const PersonController = require('../controllers/person');
const isAuthenticated = require('../middleware/isAuthenticated');

const personRouter = Router();
personRouter.use(isAuthenticated);

// Person Router
personRouter.get('/', PersonController.getAll);
personRouter.get('/:id', PersonController.getOne);
personRouter.post('/', PersonController.create);
personRouter.patch('/:id', PersonController.update);
personRouter.delete('/:id', PersonController.deleteOne);

// Gift Router
personRouter.get('/:id/gifts', PersonController.getAllGifts);
personRouter.get('/:id/gifts/:giftId', PersonController.getOneGift);
personRouter.post('/:id/gifts', PersonController.createGift);
personRouter.patch('/:id/gifts/:giftId', PersonController.updateGift);
personRouter.delete('/:id/gifts/:giftId', PersonController.deleteOneGift);
module.exports = personRouter;
