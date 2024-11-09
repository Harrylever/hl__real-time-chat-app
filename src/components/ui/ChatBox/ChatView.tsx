import { useCallback, useEffect, useState } from 'react'
import { IChat, IMessage, IUser } from 'typings'
import ChatViewHeader from './ChatViewHeader'
import MessageInputForm from '../MessageInput'
import MessageWrapper from '../Message/MessageWrapper'
import useDecryptMessage, {
  IPlainMessage,
} from 'src/hooks/decrypt-message/useDecryptMessage'
import debounce from 'lodash/debounce'
import { useAppDispatch } from 'src/app'
import { addMessages } from 'src/app/slices/messagesSlice'

interface ChatViewProps {
  user: IUser
  currentChat: IChat
  recipientUser: IUser
  encryptedMessages: IMessage[]
}

const ChatView: React.FC<ChatViewProps> = ({
  user,
  currentChat,
  recipientUser,
  encryptedMessages,
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const { decryptMessages } = useDecryptMessage()
  const [decryptedMessages, setDecryptedMessages] = useState<IPlainMessage[]>(
    [],
  )

  const fetchDecryptedMessages = useCallback(
    debounce(async (messages: IMessage[]) => {
      if (!messages.length) {
        setDecryptedMessages([])
        return
      }
      const decrypted = await decryptMessages(messages)
      setDecryptedMessages(decrypted)
    }, 1000),
    [decryptMessages],
  )

  useEffect(() => {
    dispatch(addMessages({ messages: encryptedMessages }))
  }, [dispatch, encryptedMessages])

  useEffect(() => {
    fetchDecryptedMessages(encryptedMessages)
  }, [encryptedMessages, fetchDecryptedMessages])

  return (
    <section className="relative w-full h-full bg-mx-primary-9 rounded-t-xl rounded-b-md flex flex-col items-start justify-between overflow-hidden">
      <ChatViewHeader recipientUser={recipientUser} />
      <MessageWrapper user={user} messages={decryptedMessages} />
      <MessageInputForm user={user} currentChat={currentChat} />
    </section>
  )
}

export default ChatView
