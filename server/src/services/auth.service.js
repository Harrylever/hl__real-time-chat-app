/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { UserModel } = require('../model');
const { passwordHash, comparePassword } = require('../utils/helper');
const { jwtSecretKey } = require('../config/const');

function createToken(_id) {
  const jwtKey = jwtSecretKey;
  return jwt.sign({ _id }, jwtKey, { expiresIn: '3d' });
}

async function registerUser(userData, res) {
  const { name, email, password } = userData;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User with email exists!',
    ).sendResponse(res);
  }

  const hashedPassword = passwordHash(password);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = createToken(user._id);

  return {
    success: true,
    message: 'Account successfully created',
    data: {
      id: user._id,
      name,
      email,
      token,
    },
  };
}

async function loginUser(userData) {
  const { email, password } = userData;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: 'User not found',
    };
  }

  if (!comparePassword(password, user.password)) {
    return {
      success: false,
      message: 'Invalid credentials',
    };
  }

  const { _doc } = user;

  const access = jwt.sign({ ..._doc }, jwtSecretKey, {
    expiresIn: '7d',
  });

  return {
    success: true,
    message: 'User logged in',
    data: {
      ..._doc,
      token: {
        access,
      },
    },
  };
}

module.exports = {
  registerUser,
  loginUser,
};
