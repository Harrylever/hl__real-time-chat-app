const Joi = require('joi');
const { password } = require('./custom.validator');

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    fullname: Joi.string().required(),
    email: Joi.string().required().email(),
    imgUri: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const changepassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

module.exports = { register, login, changepassword };
