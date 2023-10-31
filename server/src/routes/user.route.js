const express = require('express');
const { getAllUsersController, findUserByIdController } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validator/user.validator');

const router = express.Router();

router.route('/').get(protect, getAllUsersController);

router
  .route('/:userid')
  .get(protect, validate(userValidation.findUserById), findUserByIdController);

module.exports = router;
