import React, { useMemo } from 'react';
import { ChatBox, PotentialChatWrap, UserChatWrap } from '../molecules';
import { IChatSectionProps } from '../../../typings';
import { useAppSelector } from '../../app';

const ChatSection: React.FC<{ props: IChatSectionProps }> = ({ props }) => {
  const {
    chatsIsLoading,
    pChatsIsLoading,
    userChats,
    potentialChats,
    currentChat,
    callBackFromPotentialChatsWrap,
  } = props;
  
  // Memoize Important Values - user
  const user = useAppSelector((state) => state.userReduce);
  const memoizedUser = useMemo(() => user, [user]);

  return (
    <div className="w-full flex flex-row flex-grow-0 gap-4">
      <div className="hidden lg:flex flex-col items-start justify-start w-[350px] max-w-[310px]">
        <div className="h-fit flex flex-row gap-x-2 pb-5">
          {chatsIsLoading || pChatsIsLoading ? (
            <p>Loading chats...</p>
          ) : (
            // Potential-Chats-Wrap Component
            // the potentialChats Array is being passed as the props from THE REDUX REDUCER
            <PotentialChatWrap
              props={potentialChats}
              updatePotentialChatsCb={() => callBackFromPotentialChatsWrap()}
            />
          )}
        </div>

        <div>
          {userChats && (
            // User-Chats-Wrap Component
            // the userChats Array is being passed as the props from THE REDUX REDUCER
            <UserChatWrap props={{ chats: userChats, user: user }} />
          )}
        </div>
      </div>

      {/* The Chat Interface View */}
      <div className="w-full min-h-[85vh] h-[85vh]">
        <ChatBox
          props={{
            currentChat: currentChat,
            user: memoizedUser,
          }}
        />
      </div>
    </div>
  );
};

export default ChatSection;
