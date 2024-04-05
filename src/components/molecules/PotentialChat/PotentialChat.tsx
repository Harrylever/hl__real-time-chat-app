import React from 'react';
import { useAppSelector } from '../../../app';
import { IPotentialChatProps } from '../../../../typings';

const PotentialChat: React.FC<IPotentialChatProps> = ({
  cb,
  chat,
}): JSX.Element => {
  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers);

  return (
    <button
      onClick={cb}
      title={chat.username}
      className="flex flex-col items-center justify-center cursor-pointer"
    >
      <div className="w-fit border-2 border-[#ffffff73] rounded-full hover:border-white relative">
        <img
          src={chat.imgUri}
          alt={chat.username}
          className="w-[50px] h-[50px] rounded-full"
        />
        {onlineUsers &&
          onlineUsers.some((user) => user.userId === chat._id) && (
          <div className="rounded-full h-[10px] w-[10px] bg-green-500 absolute bottom-0.5 right-0.5"></div>
        )}
      </div>
      <p className="text-xs font-thin">
        {(chat.username as string).length > 9
          ? `${chat.username?.substring(0, 9)}..`
          : chat.username}
      </p>
    </button>
  );
};

export default PotentialChat;
