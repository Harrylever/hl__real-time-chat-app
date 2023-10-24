const Joi = require('joi');

const findUserById = {
  params: Joi.object().keys({
    userid: Joi.string().required(),
  }),
};

module.exports = {
  findUserById,
};
