const { ChatModel, UserModel } = require('../model');
const ApiError = require('../utils/ApiError');

async function createChat(chatData, res) {
  try {
    const { userOneId, userTwoId } = chatData;

    if (userOneId === userTwoId) {
      return {
        success: false,
        message: 'chat not allowed same user',
      };
    }

    const chat = await ChatModel.findOne({
      members: { $all: [userOneId, userTwoId] },
    });

    if (chat) {
      const { _doc } = chat;

      return {
        success: true,
        message: 'chat retrieved successfully',
        data: {
          ..._doc,
        },
      };
    }

    const newChat = await ChatModel.create({
      members: [userOneId, userTwoId],
    });

    const { _doc } = newChat;

    return {
      success: true,
      message: 'chat created successfully',
      data: {
        ..._doc,
      },
    };
  } catch (err) {
    console.log(err);
    throw new ApiError(err.statusCode, 'Unexpected error occured').sendResponse(
      res,
    );
  }
}

async function getUserChats(userid) {
  const user = await UserModel.findById(userid);

  if (!user) {
    return {
      success: false,
      message: 'user not found',
    };
  }

  const chats = await ChatModel.find({ members: { $in: [userid] } });

  return {
    success: true,
    message: 'chats retrieved successfully',
    data: chats,
  };
}

async function findChat({ userOneId, userTwoId }) {
  const chat = await ChatModel.findOne({
    members: { $all: [userOneId, userTwoId] },
  });

  if (!chat) {
    return {
      success: false,
      message: 'chat not found',
    };
  }

  return {
    success: true,
    message: 'Chat retrieved successfully',
    data: chat,
  };
}

module.exports = {
  createChat,
  getUserChats,
  findChat,
};
