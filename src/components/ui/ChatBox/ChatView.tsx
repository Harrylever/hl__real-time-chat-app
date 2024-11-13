import { useCallback, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { useAppDispatch } from 'src/app'
import ChatViewHeader from './ChatViewHeader'
import MessageInputForm from '../MessageInput'
import { IChat, IMessage, IUser } from 'typings'
import MessageWrapper from '../Message/MessageWrapper'
import { addMessages } from 'src/app/slices/messagesSlice'
import useDecryptMessage from 'src/hooks/decrypt-message/useDecryptMessage'

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

  const fetchDecryptedMessages = useCallback(
    debounce(async (messages: IMessage[]) => {
      const decrypted = await decryptMessages(messages)
      dispatch(addMessages({ messages: decrypted }))
    }, 1000),
    [decryptMessages],
  )

  useEffect(() => {
    if (!encryptedMessages.length) {
      dispatch(addMessages({ messages: [] }))
      return
    }
    dispatch(addMessages({ messages: [] }))
    fetchDecryptedMessages(encryptedMessages)
  }, [dispatch, encryptedMessages, fetchDecryptedMessages])

  return (
    <section className="relative w-full h-full bg-mx-primary-9 rounded-t-xl rounded-b-md flex flex-col items-start justify-between overflow-hidden">
      <ChatViewHeader recipientUser={recipientUser} />
      <MessageWrapper user={user} />
      <MessageInputForm user={user} currentChat={currentChat} />
    </section>
  )
}

export default ChatView
