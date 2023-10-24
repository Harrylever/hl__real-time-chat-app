const express = require('express');
const { getAllUsersController, findUserByIdController } = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const userValidation = require('../validator/user.validator');

const router = express.Router();

router.route('/getallusers').get(getAllUsersController);

router
  .route('/find/:userid')
  .get(validate(userValidation.findUserById), findUserByIdController);

module.exports = router;
