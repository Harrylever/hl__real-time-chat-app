const Joi = require('joi');

const createChat = {
  body: Joi.object().keys({
    userOneId: Joi.string().required(),
    userTwoId: Joi.string().required(),
  }),
};

const getUserChats = {
  params: Joi.object().keys({
    userid: Joi.string().required(),
  }),
};

const findChat = {
  params: Joi.object().keys({
    useroneid: Joi.string().required(),
    usertwoid: Joi.string().required(),
  }),
};

module.exports = {
  createChat,
  getUserChats,
  findChat,
};
