'use strict';

const { Person, Gifts, Gift } = require('../models/person');

const { BadRequestError, NotFoundError } = require('../utils/errors');

const getAll = async () => {
  const person = await Person.find();
  return person;
};

const getOne = async (id) => {
  const foundPerson = await Person.findById(id);
  if (!foundPerson) throw new NotFoundError(`Person with id ${id} not found`);
  return foundPerson;
};
//create person
const create = async (name, dateOfBirth) => {
  const newPerson = new Person({
    name,
    dateOfBirth,
  });
  await newPerson.save();
  return newPerson;
};

//create gift for person
const createGift = async (personId, name, url, store) => {
  //find the person id first
  const person = await Person.findById(personId);

  if (!person) {
    //  TODO:
    console.log('person not found');
  }

  const gift = new Gift({
    name: name,
    url: url,
    store: store,
  });

  const result = person.gifts.push(gift);
  console.log(result);

  await person.save();
  return person;
};

const replace = async (id, personData) => {
  if (!personData.name || !personData.dateOfBirth)
    throw new BadRequestError('Name & dob are required');

  const replacedPerson = await Person.findByIdAndUpdate(
    id,
    {
      ...personData,
    },
    {
      returnOriginal: false,
    }
  );

  if (!replacedPerson)
    throw new NotFoundError(`Person with id ${id} not found`);

  return replacedPerson;
};

const update = async (id, updatedFields) => {
  if (!Object.keys(updatedFields).length)
    throw new BadRequestError('Nothing to update');
  const updatedPerson = await Person.findByIdAndUpdate(
    id,
    {
      ...updatedFields,
    },
    {
      returnOriginal: false,
    }
  );

  if (!updatedPerson) throw new NotFoundError(`Person with id ${id} not found`);

  return updatedPerson;
};

const deleteOne = async (id) => {
  const deletedPerson = await Person.findByIdAndDelete(id);

  if (!deletedPerson) throw new NotFoundError(`Person with id ${id} not found`);

  return deletedPerson;
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
