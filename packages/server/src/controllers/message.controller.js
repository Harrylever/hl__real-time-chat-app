const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { createMessage, getMessages } = require('../services/message.service');

// Create Message
const createMessageController = catchAsync(async (req, res) => {
  const messageDetails = req.body;
  const result = await createMessage(messageDetails);
  return res.status(httpStatus.OK).send(result);
});

const getMessagesController = catchAsync(async (req, res) => {
  const { chatid: chatId } = req.params;
  const result = await getMessages(chatId);
  return res.status(httpStatus.OK).send(result);
});

module.exports = {
  createMessageController,
  getMessagesController,
};
