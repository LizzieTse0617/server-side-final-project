'use strict';

const { Person, Gifts, Gift } = require('../models/person');

const { BadRequestError, NotFoundError } = require('../utils/errors');

// Returns One person by id
const getOne = async (id) => {
  const foundPerson = await Person.findById(id);

  if (!foundPerson) throw new NotFoundError(`Person with id ${id} not found`);
  return foundPerson;
};

//create a new person
const create = async (name, dateOfBirth) => {
  const newPerson = new Person({
    name,
    dateOfBirth,
  });
  await newPerson.save();
  return newPerson;
};

//add a gift for a given person
const createGift = async (personId, name, url, store) => {
  //find the person id first
  const person = await Person.findById(personId);

  if (!person) {
    //  TODO: error out
    console.log('person not found');
  }

  const gift = new Gift({
    name: name,
    url: url,
    store: store,
  });

  person.gifts.push(gift);

  await person.save();
  return person;
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
  getOne,
  create,
  createGift,
  update,
  deleteOne,
};
