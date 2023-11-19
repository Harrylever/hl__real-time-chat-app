const { ChatModel, MessageModel } = require('../model');
const ApiError = require('../utils/ApiError');

async function createMessage(messageDetails, res) {
  try {
    const { chatId, senderId, text } = messageDetails;

    const chat = await ChatModel.findById(chatId);

    if (!chat) {
      return {
        success: false,
        message: 'chat not found!',
      };
    }

    const message = await MessageModel.create({
      chatId,
      senderId,
      text,
    });

    const {
      _doc,
    } = message;

    return {
      success: true,
      message: 'Message created successfully',
      data: {
        ..._doc,
      },
    };
  } catch (err) {
    console.log(err);
    throw new ApiError(err.statusCode, 'Unexpected error occured').sendResponse(res);
  }
}

async function getMessages(chatId) {
  const chat = await ChatModel.findById(chatId);

  if (!chat) {
    return {
      success: false,
      message: 'chat not found!',
    };
  }

  const messages = await MessageModel.find({ chatId });

  return {
    success: true,
    message: 'Messages found',
    data: {
      messages,
    },
  };
}

module.exports = {
  createMessage,
  getMessages,
};
