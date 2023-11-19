const express = require('express');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const messageValidation = require('../validator/message.validator');
const { createMessageController, getMessagesController } = require('../controllers/message.controller');

const router = express.Router();

router
  .route('/create')
  .post(
    protect,
    validate(messageValidation.createMessage),
    createMessageController,
  );

router
  .route('/chat/:chatid')
  .get(protect, validate(messageValidation.getMessages), getMessagesController);

module.exports = router;
