import React, { useMemo } from 'react'
import { useAppSelector } from '../../app'
import { IChatSectionProps } from '../../../typings'
import { ChatBox, UserMessageWrap } from '../molecules'

const ChatSection: React.FC<{ props: IChatSectionProps }> = ({ props }) => {
  const { userChats, currentChat } = props

  // Memoize Important Values - user
  const user = useAppSelector((state) => state.userReduce)
  const memoizedUser = useMemo(() => user, [user])

  return (
    <div className="w-full h-full flex flex-row gap-4 pt-8 px-5 sm:px-10 lg:px-0">
      <div className="hidden lg:flex flex-col items-start justify-start w-[27%] min-w-[320px] h-full overflow-hidden">
        <div className="h-full w-full pl-8 pr-0">
          {userChats && (
            // User-Chats-Wrap Component
            // the userChats Array is being passed as the props from THE REDUX REDUCER
            <UserMessageWrap
              props={{
                user: user,
                chats: userChats,
                isForMobile: false,
                messageType: 'chats',
              }}
            />
          )}
        </div>
      </div>

      {/* The Chat Interface View */}
      <div className="w-full lg:w-[73%] h-full lg:pr-5">
        <ChatBox
          props={{
            currentChat: currentChat,
            user: memoizedUser,
          }}
        />
      </div>
    </div>
  )
}

export default ChatSection
