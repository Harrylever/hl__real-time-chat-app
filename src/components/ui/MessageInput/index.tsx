import React from 'react'
import debounce from 'lodash/debounce'
import { IChat, IMessage, IUser } from 'typings'
import MessageInputForm from './MessageInputForm'
import { CipherUtil } from 'src/util/cipher.util'
import { toast } from '@/components/ui/use-toast'
import { useAppDispatch, useAppSelector } from 'src/app'
import { addMessages } from 'src/app/slices/messagesSlice'
import { usePostChatMessageMutation } from 'src/app/api/hooks'
import useDecryptMessage from 'src/hooks/decrypt-message/useDecryptMessage'

interface MessageInputWrapperProps {
  user: IUser
  currentChat: IChat
}

const MessageInputWrapper: React.FC<MessageInputWrapperProps> = ({
  user,
  currentChat,
}) => {
  const dispatch = useAppDispatch()
  const cipherUtil = new CipherUtil()
  const { decryptMessages } = useDecryptMessage()
  const { messages: existingMessages } = useAppSelector(
    (state) => state.messageReduce,
  )
  const {
    mutateAsync: sendMessage,
    isPending,
    isSuccess,
  } = usePostChatMessageMutation()

  const handleDecryptMessage = debounce(async (message: IMessage) => {
    const decrypted = await decryptMessages([message])

    const combinedMessages = [...existingMessages, ...decrypted]
    dispatch(addMessages({ messages: combinedMessages }))
  }, 1000)

  const handleSendMessage = async (message: string) => {
    const { encryptedData, secure } = await cipherUtil.encryptData(
      message.trim(),
    )

    const data = {
      text: encryptedData.toHex(),
      senderId: user.email,
      chatId: currentChat.id,
      aesKey: secure.aesKey,
      iv: secure.iv,
    }

    try {
      const response = await sendMessage(data)
      handleDecryptMessage(response.data)
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
