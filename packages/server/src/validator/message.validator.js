const Joi = require('joi');

const createMessage = {
  body: Joi.object().keys({
    chatId: Joi.string().required(),
    senderId: Joi.string().required(),
    text: Joi.string().required(),
  }),
};

const getMessages = {
  params: Joi.object().keys({
    chatid: Joi.string().required(),
  }),
};

module.exports = {
  createMessage,
  getMessages,
};
