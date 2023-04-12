'use strict'
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const {UnauthorizedError, NotFoundError} = require('../utils/errors');

const isAuthenticated = async (req, res, next) => {
  //step 4 - look up token in headers
const rawToken = req.headers.authorization;
const token = rawToken?.replace("Bearer ",""); //now we have only the token

/* if( !token){
  return next(new UnauthorizedError('JWT not found'));

}
 */

  //step 5 - verify token
try{
const { id } = jwt.verify(token, process.env.JWT_SECRET);

  //step 7 - look up a user from the id
const user = await User.findById(id);

  //step 8 - throw an error if user not found
/* if(!user){
  throw new NotFoundError('User not found')
} */

req.user = user;
return next();
  //step 9 - attach the user to the request



} catch(error){
    //step 6 - throw an err if not verified
  //next(new Unauthorize dError(error.message));
  return next();
}


  };
  
  module.exports = isAuthenticated;
  