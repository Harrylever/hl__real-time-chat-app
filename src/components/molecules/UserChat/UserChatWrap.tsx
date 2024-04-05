import React from 'react';
import UserChat from './UserChat';
import { useAppDispatch, useAppSelector } from '../../../app';
import { IChat, IUserChatWrapProps } from '../../../../typings';
import { updateCurrentChat } from '../../../app/slices/chatSlice';
import { setSideBarChatDisplay } from '../../../app/slices/appUIStateSlice';

const UserChatWrap: React.FC<{
  props: IUserChatWrapProps;
}> = ({ props: { chats, user } }) => {
  const dispatch = useAppDispatch();

  const sideBarChatListIsOpen = useAppSelector((state) => state.appUIStateReduce.sideBarChatOpen);

  // Update the current chat reducer
  const updateCurrentChatHandler = (chat: IChat) => {
    dispatch(
      updateCurrentChat({
        chat,
      })
    );

    if (sideBarChatListIsOpen) {
      setTimeout(() => {
        dispatch(
          setSideBarChatDisplay({
            sideBarChatOpen: false,
          })
        );
      }, 500);
    }
  };

  return (
    <div className="w-full">
      {chats.map((chat, _) => (
        <div key={_} onClick={() => updateCurrentChatHandler(chat)}>
          <UserChat props={{ chat: chat, user: user }} />
        </div>
      ))}
    </div>
  );
};

export default UserChatWrap;
