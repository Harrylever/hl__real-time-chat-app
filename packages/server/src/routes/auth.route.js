const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validator/auth.validator');
const {
  registerUserController,
  loginUserController,
  changePasswordController,
  sendMailToUserController,
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/register')
  .post(protect, validate(authValidation.register), registerUserController);

router
  .route('/login')
  .post(protect, validate(authValidation.login), loginUserController);

router
  .route('/changepassword')
  .post(
    protect,
    validate(authValidation.changepassword),
    changePasswordController,
  );

router
  .route('/sendmail')
  .get(sendMailToUserController);

module.exports = router;
