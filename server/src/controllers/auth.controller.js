const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  registerUser, loginUser, changePassword, sendMailToUser,
} = require('../services/auth.service');

const registerUserController = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await registerUser(userData, res);
  return res.status(httpStatus.CREATED).send(result);
});

const loginUserController = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await loginUser(userData);
  return res.status(httpStatus.OK).send(result);
});

const changePasswordController = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await changePassword(userData);
  return res.status(httpStatus.OK).send(result);
});

const sendMailToUserController = catchAsync(async (req, res) => {
  const result = await sendMailToUser();
  return res.status(httpStatus.OK).send(result);
});

module.exports = {
  registerUserController,
  loginUserController,
  changePasswordController,
  sendMailToUserController,
};
