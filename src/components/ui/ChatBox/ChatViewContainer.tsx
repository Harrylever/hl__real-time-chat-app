import React, { useEffect, useMemo } from 'react'
import {
  useGetChatMessagesQuery,
  useGetRecipientUserQuery,
} from 'src/app/api/hooks'
import ChatView from './ChatView'
import { IChat, IUser } from 'typings'
import { LoadingPlayer } from 'src/components/ui'
import { useToast } from '@/components/ui/use-toast'

interface ChatViewContainerProps {
  user: IUser
  currentChat: IChat
}

const ChatViewContainer: React.FC<ChatViewContainerProps> = ({
  user,
  currentChat,
}) => {
  const { toast } = useToast()

  const {
    data: messagesData,
    error: messagesError,
    isLoading: isLoadingMessages,
  } = useGetChatMessagesQuery(currentChat.id as string)

  const {
    data: recipientUserData,
    error: recipientUserError,
    isLoading: isLoadingRecipientUser,
  } = useGetRecipientUserQuery(
    {
      accountId: user?.email ?? '',
      members: currentChat.members ?? [],
    },
    { enabled: !!user.email && currentChat.members?.length > 0 },
  )

  const recipientUser = useMemo(
    () => (recipientUserData?.data ? recipientUserData.data : undefined),
    [recipientUserData],
  )
  const messages = useMemo(() => messagesData?.data ?? [], [messagesData])

  const isLoading = isLoadingMessages || isLoadingRecipientUser
  const hasError = messagesError || recipientUserError

  useEffect(() => {
    if (!isLoading && hasError) {
      toast({
        variant: 'destructive',
        title: 'Error fetching messages',
      })
    }
  }, [hasError, isLoading, toast])

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>Loading messages...</p>
        <LoadingPlayer />
      </div>
    )
  }

  if (hasError || !recipientUser) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Error fetching messages or recipient user data...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <ChatView
        messages={messages}
        userEmail={user.email ?? ''}
        recipientUser={recipientUser}
      />
    </div>
  )
}

export default ChatViewContainer
