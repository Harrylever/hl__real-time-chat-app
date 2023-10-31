/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { UserModel } = require('../model');
const { passwordHash, comparePassword, getRandomNumberFromOneToFour } = require('../utils/helper');
const { jwtSecretKey } = require('../config/const');
const { AccountCreatedMailer } = require('../mail/mailer');

const userImageUriList = [
  'https://res.cloudinary.com/dflaxke3m5i3/image/upload/v1698460558/male-2_i6afsr.png',
  'https://res.cloudinary.com/dflaxke3m5i3/image/upload/v1698460558/male-1_qybehk.png',
  'https://res.cloudinary.com/dflaxke3m5i3/image/upload/v1698460558/female-1_d4t80g.png',
  'https://res.cloudinary.com/dflaxke3m5i3/image/upload/v1698460558/female-2_rqennn.png',
];

async function registerUser(userData, res) {
  const {
    fullname, username, email, password,
  } = userData;

  const userExistsOnEmail = await UserModel.findOne({ email });

  if (userExistsOnEmail) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'user with email exists!',
    ).sendResponse(res);
  }

  const userExistsOnUsername = await UserModel.findOne({ username });

  if (userExistsOnUsername) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'user with username exists!',
    ).sendResponse(res);
  }

  const hashedPassword = passwordHash(password);
  const jwtEncPassword = jwt.sign(password, jwtSecretKey);

  const randomNumber = getRandomNumberFromOneToFour();
  const imgUri = userImageUriList[randomNumber];

  const user = await UserModel.create({
    imgUri,
    fullname,
    username,
    email,
    password: hashedPassword,
    jwt_enc_password: jwtEncPassword,
  });

  await AccountCreatedMailer({ receiver: email, username });

  return {
    success: true,
    message: 'Account successfully created',
    data: {
      user: user._id,
    },
  };
}

async function loginUser(userData) {
  const { email, password } = userData;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: 'user not found!',
    };
  }

  if (!comparePassword(password, user.password)) {
    return {
      success: false,
      message: 'invalid credentials!',
    };
  }

  const { _doc } = user;

  const access = jwt.sign({ ..._doc }, jwtSecretKey, {
    expiresIn: '7d',
  });
  const refresh = jwt.sign({ ..._doc }, jwtSecretKey, { expiresIn: '30d' });

  return {
    success: true,
    message: 'User logged in',
    data: {
      access,
      refresh,
    },
  };
}

async function changePassword(userData) {
  const { email, password } = userData;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: 'user not found!',
    };
  }

  const hashedPassword = passwordHash(password);
  const jwtEncPassword = jwt.sign(password, jwtSecretKey);

  await user.updateOne({
    $set: {
      password: hashedPassword,
      jwt_enc_password: jwtEncPassword,
    },
  });

  return {
    success: true,
    message: 'Password changed successfully',
  };
}

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
