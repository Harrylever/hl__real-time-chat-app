/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const { ApiError } = require('../utils/ApiError');
const { UserModel } = require('../model');

async function getAllUsers(res) {
  const users = await UserModel.find({});

  if (!users) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Users not found',
    ).sendResponse(res);
  }

  return {
    success: true,
    message: 'Users found successfully',
    data: users,
  };
}

async function findUserById(userid) {
  const user = await UserModel.findById(userid);

  if (!user) {
    return {
      success: false,
      message: 'User not found',
    };
  }

  const {
    _doc,
  } = user;

  return {
    success: true,
    message: 'User found',
    data: {
      ..._doc,
    },
  };
}

module.exports = {
  getAllUsers,
  findUserById,
};
