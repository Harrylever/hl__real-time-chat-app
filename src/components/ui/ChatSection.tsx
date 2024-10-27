import React from 'react'
import { IUser } from 'typings'
import ChatBox from './ChatBox/ChatBox'
import { useAppSelector } from 'src/app'
import UserChatsWrap from './UserChat/UserChatsWrap'

interface ChatSectionProps {
  user: IUser
}

const ChatSection: React.FC<ChatSectionProps> = ({ user }) => {
  const userChats = useAppSelector((state) => state.userChatsReduce.chats)

  return (
    <div className="w-full h-full flex flex-row gap-4 pt-8 px-5 sm:px-10 lg:px-0">
      <div className="hidden lg:flex flex-col items-start justify-start w-[27%] min-w-[320px] h-full overflow-hidden">
        <div className="h-full w-full pl-8 pr-0">
          {/* // User-Chats-Wrap Component
          // the userChats Array is being passed as the props from THE REDUX REDUCER */}
          <UserChatsWrap chats={userChats} />
        </div>
      </div>

      {/* The Chat Interface View */}
      <div className="w-full lg:w-[73%] h-full lg:pr-5">
        <ChatBox user={user} />
      </div>
    </div>
  )
}

export default ChatSection
