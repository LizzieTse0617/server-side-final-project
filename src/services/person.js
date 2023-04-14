'use strict';

const { Person, Gifts, Gift } = require('../models/person');
const mongoose = require('mongoose');
const { BadRequestError, NotFoundError } = require('../utils/errors');
const { ForbiddenError } = require('../utils/errors');

// returns all people owned by current user
const getAll = async (ownersId) => {
  const idObject = new mongoose.Types.ObjectId(ownersId);
  const person = await Person.find({ ownerId: idObject });
  return person;
};

// Returns One person by id
const getOne = async (personId, ownersId) => {
  const idObject = new mongoose.Types.ObjectId(ownersId);
  // const foundPerson = await Person.findById(personId);
  const foundPerson = await Person.find({ _id: personId, ownerId: idObject });

  if (!foundPerson)
    throw new NotFoundError(`Person with id ${personId} not found`);
  return foundPerson;
};

//create a new Person
const create = async (name, dateOfBirth, ownerId) => {
  const newPerson = new Person({
    name,
    dateOfBirth,
    ownerId,
  });
  await newPerson.save();
  return newPerson;
};

//add a gift for a given person
const createGift = async (personId, name, url, store, ownerId) => {
  //find the person id first
  const idObject = new mongoose.Types.ObjectId(ownerId);

  const person = await Person.findOne({ _id: personId, ownerId: idObject });
  console.log(personId, ownerId);
  if (!person) {
    //  TODO: revise the error message
    throw new ForbiddenError(`You are not the owner of this document`);
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

// Update Person details: name and dob
const update = async (id, updatedFields, ownerId) => {
  if (!Object.keys(updatedFields).length)
    throw new BadRequestError('Nothing to update');

  const idObject = new mongoose.Types.ObjectId(ownerId);

  const updatedPerson = await Person.findOneAndUpdate(
    { _id: id, ownerId: idObject },
    { ...updatedFields },
    { returnOriginal: false }
  );

  if (!updatedPerson) {
    throw new NotFoundError(`Person with id ${id} not found`);
  }

  return updatedPerson;
};

// returns all people owned by current user
const getAllGifts = async (personId, ownersId) => {
  const idObject = new mongoose.Types.ObjectId(ownersId);
  const person = await Person.findOne({ ownerId: idObject, _id: personId });
  return person.gifts;
};

// returns one gift belonging to a Person
const getOneGift = async (personId, giftId, ownersId) => {
  const idObject = new mongoose.Types.ObjectId(ownersId);
  const person = await Person.findOne({ ownerId: idObject, _id: personId });
  const idx = person.gifts.findIndex((gift) => {
    return gift._id.toString() === giftId;
  });
  if (idx < 0) {
    throw new NotFoundError(`Gift with ${giftId} not found`);
  }
  return person.gifts.at(idx);
};
const updateGift = async (personId, ownerId, giftId, updatedFields) => {
  //meaning ownerId change to idObject use mongoose filter
  const idObject = new mongoose.Types.ObjectId(ownerId);

  if (!Object.keys(updatedFields).length)
    throw new BadRequestError('Nothing to update');

  const person = await Person.findOne({ _id: personId, ownerId: idObject });
  if (!person) throw new NotFoundError(`Person with id ${personId} not found`);

  const idx = person.gifts.findIndex((gift) => gift._id.toString() === giftId);
  if (idx < 0) throw new NotFoundError(`Gift with id ${giftId} not found`);

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

  return person.gifts[idx];
};

const deleteOne = async (id, ownerId) => {
  const idObject = new mongoose.Types.ObjectId(ownerId);

  const deletedPerson = await Person.findOneAndDelete({
    _id: id,
    ownerId: idObject,
  });

  if (!deletedPerson) {
    throw new NotFoundError(`Person with id ${id} not found`);
  }

  return deletedPerson;
};

const deleteOneGift = async (personId, giftId, ownerId) => {
  const idObject = new mongoose.Types.ObjectId(ownerId);

  const person = await Person.findOne({
    _id: personId,
    ownerId: idObject,
  });

  if (!person) throw new NotFoundError(`Person with id ${personId} not found`);

  const gifts = person.gifts;

  const idx = gifts.findIndex((gift) => gift._id.toString() === giftId);
  let deletedGift = null;
  if (idx >= 0) {
    deletedGift = person.gifts.at(idx);
    person.gifts.splice(idx, 1);
    await person.save();
  }

  return deletedGift;
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
