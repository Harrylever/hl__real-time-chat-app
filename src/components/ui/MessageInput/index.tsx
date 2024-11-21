import React from 'react'
import debounce from 'lodash/debounce'
import MessageInputForm from './MessageInputForm'
import { toast } from '@/components/ui/use-toast'
import { IChat, IPlainMessage, IUser } from 'typings'
import useSocketClient from 'src/hooks/useSocketClient'
import { useAppDispatch, useAppSelector } from 'src/app'
import { addMessages } from 'src/app/slices/messagesSlice'
import { usePostChatMessageMutation } from 'src/app/api/hooks'
import { IMessageFormValues } from 'src/app/api/actions/message'

interface MessageInputWrapperProps {
  user: IUser
  currentChat: IChat
}

const MessageInputWrapper: React.FC<MessageInputWrapperProps> = ({
  user,
  currentChat,
}) => {
  const dispatch = useAppDispatch()
  const { handleSendMessage: sendMessageToSocket } = useSocketClient()
  const { messages: existingMessages } = useAppSelector(
    (state) => state.messageReduce,
  )
  const {
    mutateAsync: sendMessage,
    isPending,
    isSuccess,
  } = usePostChatMessageMutation()

  const handleAddMessageToState = debounce(async (message: IPlainMessage) => {
    const combinedMessages = [...existingMessages, message]
    dispatch(addMessages(combinedMessages))
  }, 500)

  const handleSendMessage = async (message: string) => {
    const data: IMessageFormValues = {
      text: message,
      senderId: user.email,
      chatId: currentChat.id,
    }

    try {
      const response = await sendMessage(data)
      sendMessageToSocket(response.data)
      handleAddMessageToState(response.data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: 'Error sending message',
      })
    }
  }

  return (
    <MessageInputForm
      onSubmit={handleSendMessage}
      isSending={isPending}
      isSuccess={isSuccess}
    />
  )
}

export default MessageInputWrapper
