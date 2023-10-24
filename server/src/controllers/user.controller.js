const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { getAllUsers, findUserById } = require('../services/user.service');

const getAllUsersController = catchAsync(async (req, res) => {
  const result = await getAllUsers(res);
  return res.status(httpStatus.OK).send(result);
});

const findUserByIdController = catchAsync(async (req, res) => {
  const { userid } = req.params;
  const result = await findUserById(userid);
  return res.status(httpStatus.OK).send(result);
});

module.exports = {
  getAllUsersController,
  findUserByIdController,
};
