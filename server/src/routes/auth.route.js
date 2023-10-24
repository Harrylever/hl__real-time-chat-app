const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validator/auth.validator');
const {
  registerUserController,
  loginUserController,
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/register')
  .post(validate(authValidation.register), registerUserController);

router
  .route('/login')
  .post(validate(authValidation.login), loginUserController);

module.exports = router;
