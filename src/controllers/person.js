//const PersonService = require("../services/person");
const PersonService = require('../services/person');

const getAll = async (_req, res, next) => {
  try {
    const person = await PersonService.getAll();
    res.json({ data: person });
  } catch (error) {
    next(error);
  }
};

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
    //const createdPerson = await PersonService.create(name, url, store);
    res.status(201).json({ data: null });
  } catch (error) {
    next(error);
  }
};

const replace = async (req, res, next) => {
  try {
    const replacedPerson = await PersonService.replace(
      req.params.id,
      req.sanitizedBody
    );
    res.json({ data: replacedPerson });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
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
  getAll,
  getOne,
  create,
  createGift,
  replace,
  update,
  deleteOne,
};
