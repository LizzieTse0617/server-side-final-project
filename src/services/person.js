'use strict';

const { Person, Gifts, Gift } = require('../models/person');

const { BadRequestError, NotFoundError } = require('../utils/errors');

const getAll = async () => {
  const person = await Person.find();
  return person;
};

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

const updateGift = async (personId, giftId, updatedFields) => {
  if (!Object.keys(updatedFields).length)
    throw new BadRequestError('Nothing to update');

  const person = await Person.findById(personId);
  if (!person) throw new NotFoundError(`Person with id ${personId} not found`);

  const idx = person.gifts.findIndex((gift) => gift._id.toString() === giftId);
  if (idx < 0) throw new NotFoundError(`Gift with id ${giftId} not found`);

  console.log('person found ', person);
  console.log('gift found', idx);

  const id = person.gifts[idx]._id;

  if (updatedFields.name) {
    person.gifts[idx].name = updatedFields.name;
  }

  if (updatedFields.url) {
    person.gifts[idx].url = updatedFields.url;
  }

  if (updatedFields.store) {
    person.gifts[idx].store = updatedFields.store;
  }

  await person.save();

  return person;
};

const deleteOne = async (id) => {
  const deletedPerson = await Person.findByIdAndDelete(id);

  if (!deletedPerson) throw new NotFoundError(`Person with id ${id} not found`);

  return deletedPerson;
};

const deleteOneGift = async (personId, giftId) => {
  const person = await Person.findById(personId);

  if (!person) throw new NotFoundError(`Person with id ${personId} not found`);

  const gifts = person.gifts;

  const idx = gifts.findIndex((gift) => gift._id.toString() === giftId);
  if (idx >= 0) {
    person.gifts.splice(idx, 1);
    await person.save();
  }

  return person;
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
