import React from 'react'
import {
  useGetChatMessagesQuery,
  useGetRecipientUserQuery,
} from 'src/app/api/hooks'
import ChatView from './ChatView'
import { IChat, IUser } from 'typings'
import LoadingPlayer from '../LoadingPlayer'

interface ChatBoxProps {
  user: IUser
  currentChat: IChat
}

const ChatBox: React.FC<ChatBoxProps> = ({ user, currentChat }) => {
  const {
    data: messages,
    isError: isMessagesError,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useGetChatMessagesQuery(currentChat.id)

  const {
    data: recipientUserData,
    isError: isRecipientUserError,
    isLoading: isLoadingRecipientUser,
    refetch: refetchRecipientUser,
  } = useGetRecipientUserQuery({
    accountId: user.email,
    members: currentChat.members,
  })

  const isLoading = isLoadingMessages || isLoadingRecipientUser

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>Loading messages...</p>
        <LoadingPlayer />
      </div>
    )
  }

  if (isMessagesError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Error fetching messages...</p>
        <button
          type="button"
          name="refetch-message"
          onClick={() => refetchMessages()}
        >
          Retry
        </button>
      </div>
    )
  }

  if (isRecipientUserError || !recipientUserData?.data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Error fetching user...</p>
        <button
          type="button"
          name="refetch-recipient-user"
          onClick={() => refetchRecipientUser()}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="w-full lg:w-[73%] h-full lg:pr-5">
      <ChatView
        user={user}
        currentChat={currentChat}
        recipientUser={recipientUserData.data}
        messages={messages?.data ?? []}
      />
    </div>
  )
}

export default ChatBox
