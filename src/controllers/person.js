//const PersonService = require("../services/person");
const PersonService = require('../services/person');

const getAll = async (req, res, next) => {
  try {
    const person = await PersonService.getAll(req.user._id);

    res.json({ data: person });
  } catch (error) {
    next(error);
  }
};

// returns Person
const getOne = async (req, res, next) => {
  try {
    const personId = req.params.id;
    const userId = req.user._id;
    const person = await PersonService.getOne(personId, userId);
    res.json({ data: person });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, dateOfBirth } = req.sanitizedBody;

    //TODO:
    //right now, we have objectId parameter, which is used for differentiate different google user//and we have to add google user to the data when they try to create sth (under their acc)
    const createdPerson = await PersonService.create(
      name,
      dateOfBirth,
      req.user._id
    );
    console.log(createdPerson);
    res.status(201).json({ data: createdPerson });
  } catch (error) {
    next(error);
  }
};
const createGift = async (req, res, next) => {
  try {
    const personId = req.params.personId;
    const { name, url, store } = req.sanitizedBody;
    const ownerId = req.user._id;

    const person = await PersonService.createGift(
      personId,
      name,
      url,
      store,
      ownerId
    );
    res.status(201).json({ data: person });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  // console.log('val', req.params.id, req.sanitizedBody);
  const ownerId = req.user._id;
  const personId = req.params.id;

  try {
    const updatedGift = await PersonService.update(
      personId,
      req.sanitizedBody,
      ownerId
    );

    res.json({ data: updatedGift });
  } catch (error) {
    next(error);
  }
};
const updateGift = async (req, res, next) => {
  // console.log('val', req.params.id, req.sanitizedBody);

  const { giftId, personId } = req.params;
  const ownerId = req.user._id;
  try {
    const updatedGift = await PersonService.updateGift(
      personId,
      ownerId,
      giftId,
      req.sanitizedBody
    );

    res.json({ data: updatedGift });
  } catch (error) {
    next(error);
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const deletedPerson = await PersonService.deleteOne(
      req.params.id,
      req.user._id
    );
    console.log(deletedPerson);
    res.json({ data: deletedPerson });
  } catch (error) {
    next(error);
  }
};

const deleteOneGift = async (req, res, next) => {
  const ownerId = req.user._id;

  try {
    const { personId, giftId } = req.params;

    const person = await PersonService.deleteOneGift(personId, giftId, ownerId);
    res.json({ data: person });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  createGift,
  update,
  updateGift,
  deleteOne,
  deleteOneGift,
};
