import { useCallback, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { useAppDispatch } from 'src/app'
import ChatViewHeader from './ChatViewHeader'
import MessageInputWrapper from '../MessageInput'
import { IChat, IPlainMessage, IUser } from 'typings'
import MessageWrapper from '../Message/MessageWrapper'
import { addMessages } from 'src/app/slices/messagesSlice'

interface ChatViewProps {
  user: IUser
  currentChat: IChat
  recipientUser: IUser
  messages: IPlainMessage[]
}

const ChatView: React.FC<ChatViewProps> = ({
  user,
  currentChat,
  recipientUser,
  messages,
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const debouncedAddMessages = useCallback(
    debounce((messages: IPlainMessage[]) => {
      dispatch(addMessages(messages))
    }, 100),
    [dispatch],
  )

  useEffect(() => {
    if (!messages.length) {
      dispatch(addMessages([]))
      return
    }
    debouncedAddMessages(messages)
  }, [debouncedAddMessages, dispatch, messages])

  return (
    <section className="relative w-full h-full bg-mx-primary-9 rounded-t-xl rounded-b-md flex flex-col items-start justify-between overflow-hidden">
      <ChatViewHeader recipientUser={recipientUser} />
      <MessageWrapper user={user} />
      <MessageInputWrapper user={user} currentChat={currentChat} />
    </section>
  )
}

export default ChatView
