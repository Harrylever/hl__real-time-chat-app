import React from 'react';
import UserChat from './UserChat';
import { IUserChatWrapProps } from '../../../../typings';

const UserChatWrap: React.FC<{
  props: IUserChatWrapProps;
}> = ({ props: { chats, user } }) => {

  return (
    <div className="w-full">
      {chats.map((chat, _) => (
        <div key={_}>
          <UserChat props={{ chat: chat, user: user }} />
        </div>
      ))}
    </div>
  );
};

export default UserChatWrap;
