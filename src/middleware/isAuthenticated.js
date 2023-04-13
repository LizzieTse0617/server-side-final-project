'use strict';
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { UnauthorizedError, NotFoundError } = require('../utils/errors');

const isAuthenticated = async (req, res, next) => {
  const rawToken = req.headers.authorization;
  console.log(rawToken);
  const token = rawToken?.replace('Bearer ', '');
  console.log(token);

  if (!token) {
    return next(new UnauthorizedError('JWT not found'));
  } //check different kind of error, bad request, unauthorized

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log('id', id);
    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    req.user = user;
    console.log(user);
    return next();
  } catch (error) {
    return next(new UnauthorizedError(error.message));
  }
};

module.exports = isAuthenticated;
