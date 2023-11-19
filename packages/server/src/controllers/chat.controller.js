const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { createChat, getUserChats, findChat } = require('../services/chat.service');

// Create Chat Controller
const createChatController = catchAsync(async (req, res) => {
  const chatData = req.body;
  const result = await createChat(chatData);
  return res.status(httpStatus.CREATED).send(result);
});

// Get User Chats
const getUserChatsController = catchAsync(async (req, res) => {
  const { userid } = req.params;
  const result = await getUserChats(userid);
  return res.status(httpStatus.OK).send(result);
});

// Find Chat
const findChatController = catchAsync(async (req, res) => {
  const { useroneid: userOneId, usertwoid: userTwoId } = req.params;
  const result = await findChat({ userOneId, userTwoId });
  return res.status(httpStatus.OK).send(result);
});

module.exports = {
  createChatController,
  getUserChatsController,
  findChatController,
};
