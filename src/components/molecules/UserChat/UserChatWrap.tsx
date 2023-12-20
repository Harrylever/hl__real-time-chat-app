import React from 'react';
import { IChat, IUserChatWrapProps } from '../../../../typings';
import UserChat from './UserChat';
import { useAppDispatch } from '../../../app';
import { updateCurrentChat } from '../../../app/slices/chatSlice';

const UserChatWrap: React.FC<{
  props: IUserChatWrapProps;
}> = ({ props: { chats, user } }) => {
  const dispatch = useAppDispatch();

  // Update the current chat reducer
  const updateCurrentChatHandler = (chat: IChat) => {
    dispatch(
      updateCurrentChat({
        chat,
      })
    );
  };

  return (
    <div>
      {chats.map((chat, _) => (
        <div key={_} onClick={() => updateCurrentChatHandler(chat)}>
          <UserChat props={{ chat: chat, user: user }} />
        </div>
      ))}
    </div>
  );
};

export default UserChatWrap;
