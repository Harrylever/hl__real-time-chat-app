import ChatView from './ChatView'
import React, { useEffect } from 'react'
import { ChatBoxProps, IAccount, IChat } from '../../../../typings'
import { useGetChatMessagesQuery } from 'src/app/api/hooks'
import { useAppSelector } from 'src/app'

const ChatBox: React.FC<ChatBoxProps> = ({ user }) => {
  const currentChat = useAppSelector((state) => state.chatReduce.chat)

  return (
    <div className="w-full h-full">
      {currentChat ? (
        <ChatViewContainer user={user} currentChat={currentChat} />
      ) : (
        <div className="w-full h-full">
          <div className="relative w-full h-full bg-mx-primary-9 border border-mx-stroke rounded-lg shadow-md">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-3">
              <img
                src={'/svg/message-text-icon.svg'}
                alt="Get Chatting"
                className="relative w-[92.5px] h-auto opacity-90"
              />
              <p className="font-bold text-mx-primary-7 text-4xl">
                Get Chatting
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface ChatViewContainerProps {
  user: IAccount
  currentChat: IChat
}

const ChatViewContainer: React.FC<ChatViewContainerProps> = ({
  user,
  currentChat,
}) => {
  console.log(currentChat._id)
  const { data, error } = useGetChatMessagesQuery(currentChat._id as string)

  useEffect(() => {
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data.data)
    }
  }, [data, error])

  return (
    <div className="w-full h-full">
      <ChatView
        messages={[]}
        userEmail={user.email ?? ''}
        recipientUser={user}
      />
    </div>
  )
}

export default ChatBox
