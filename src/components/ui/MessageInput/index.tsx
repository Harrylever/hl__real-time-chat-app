import React from 'react'
import { IChat, IUser } from 'typings'
import MessageInputForm from './MessageInputForm'
import { usePostChatMessageMutation } from 'src/app/api/hooks'
import { CipherUtil } from 'src/util/cipher.util'
import { toast } from '@/components/ui/use-toast'

interface MessageInputWrapperProps {
  user: IUser
  currentChat: IChat
}

const MessageInputWrapper: React.FC<MessageInputWrapperProps> = ({
  user,
  currentChat,
}) => {
  const cipherUtil = new CipherUtil()
  const { mutateAsync: sendMessage, isPending } = usePostChatMessageMutation()

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
      await sendMessage(data)
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: 'Error sending message',
      })
    }
  }

  return <MessageInputForm onSubmit={handleSendMessage} isSending={isPending} />
}

export default MessageInputWrapper
