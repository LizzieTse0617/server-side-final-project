//const PersonService = require("../services/person");
const PersonService = require('../services/person');

const getOne = async (req, res, next) => {
  try {
    const person = await PersonService.getOne(req.params.id);
    res.json({ data: person });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, dateOfBirth } = req.sanitizedBody;
    const createdPerson = await PersonService.create(name, dateOfBirth);
    res.status(201).json({ data: createdPerson });
  } catch (error) {
    next(error);
  }
};

const createGift = async (req, res, next) => {
  try {
    const personId = req.params.personId;
    const { name, url, store } = req.sanitizedBody;
    console.log(personId, name, url, store);
    const person = await PersonService.createGift(personId, name, url, store);
    res.status(201).json({ data: person });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  // console.log('val', req.params.id, req.sanitizedBody);
  try {
    const updatedPerson = await PersonService.update(
      req.params.id,
      req.sanitizedBody
    );

    res.json({ data: updatedPerson });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const deletedPerson = await PersonService.deleteOne(req.params.id);
    res.json({ data: deletedPerson });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOne,
  create,
  createGift,
  update,
  deleteOne,
};
