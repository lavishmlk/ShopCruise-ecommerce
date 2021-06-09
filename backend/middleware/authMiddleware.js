//see middleware video of technical thappa first
//Bassir Jafarzadeh

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      //first parameter is always token and second is a secret
      //ye mainly token ko decode karne ke liye
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //we dont want to send the password
      //   So that is everything from the user document, minus the password.
      //const user bhi kar sakte the par req property me dalna is good practice
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
