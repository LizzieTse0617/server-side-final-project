//const PersonService = require("../services/person");
const PersonService = require('../services/person');

const getAll = async (req, res, next) => {
  // TODO: make sure people object only has "name", "dob" and "_id fields"
  try {
    const people = await PersonService.getAll(req.user._id);
    res.json({ data: people });
  } catch (error) {
    next(error);
  }
};

// returns one person specified by id
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

// Create new Person for the logged in user
const create = async (req, res, next) => {
  try {
    const { name, dateOfBirth } = req.sanitizedBody;
    const createdPerson = await PersonService.create(
      name,
      dateOfBirth,
      req.user._id
    );
    res.status(201).json({ data: createdPerson });
  } catch (error) {
    next(error);
  }
};

// Patch/Update a Person entry
const update = async (req, res, next) => {
  const ownerId = req.user._id;
  const personId = req.params.id;

  try {
    const updatedPerson = await PersonService.update(
      personId,
      req.sanitizedBody,
      ownerId
    );

    res.json({ data: updatedPerson });
  } catch (error) {
    next(error);
  }
};

//Delete a Person entry
const deleteOne = async (req, res, next) => {
  try {
    const deletedPerson = await PersonService.deleteOne(
      req.params.id,
      req.user._id
    );
    res.json({ data: deletedPerson });
  } catch (error) {
    next(error);
  }
};

// Get all gifts under a person
const getAllGifts = async (req, res, next) => {
  const ownerId = req.user._id;
  const { id } = req.params;

  try {
    const gifts = await PersonService.getAllGifts(id, ownerId);
    res.json({ data: gifts });
  } catch (error) {
    next(error);
  }
};

//Get one gift
// returns one person specified by id
const getOneGift = async (req, res, next) => {
  try {
    const { id, giftId } = req.params;
    // const personId = req.params.id;
    const userId = req.user._id;
    const gift = await PersonService.getOneGift(id, giftId, userId);
    res.json({ data: gift });
  } catch (error) {
    next(error);
  }
};

// Create a new Gift object under a person
const createGift = async (req, res, next) => {
  try {
    const personId = req.params.id;
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

const updateGift = async (req, res, next) => {
  // console.log('val', req.params.id, req.sanitizedBody);

  const { giftId, id } = req.params;
  const ownerId = req.user._id;
  try {
    const updatedGift = await PersonService.updateGift(
      id,
      ownerId,
      giftId,
      req.sanitizedBody
    );

    res.json({ data: updatedGift });
  } catch (error) {
    next(error);
  }
};

const deleteOneGift = async (req, res, next) => {
  const ownerId = req.user._id;

  try {
    const { id, giftId } = req.params;

    const deletedGift = await PersonService.deleteOneGift(id, giftId, ownerId);
    res.json({ data: deletedGift });
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
  getAllGifts,
  getOneGift,
};
