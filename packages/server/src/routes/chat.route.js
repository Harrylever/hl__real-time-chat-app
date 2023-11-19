const express = require('express');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth');
const chatValidation = require('../validator/chat.validator');

const { createChatController, getUserChatsController, findChatController } = require('../controllers/chat.controller');

const router = express.Router();

router
  .route('/create')
  .post(protect, validate(chatValidation.createChat), createChatController);

router
  .route('/getuserchats/:userid')
  .get(protect, validate(chatValidation.getUserChats), getUserChatsController);

router.route('/find/:useroneid/:usertwoid').get(protect, validate(chatValidation.findChat), findChatController);

module.exports = router;
