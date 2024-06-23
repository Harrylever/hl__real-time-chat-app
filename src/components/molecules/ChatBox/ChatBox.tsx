import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  FormEvent,
  useCallback,
  ChangeEvent,
} from 'react'
import {
  IUser,
  IMessage,
  IChatBoxProps,
  IChatViewProps,
} from '../../../../typings'
import clsx from 'clsx'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Message, MessageInputForm } from 'src/components/ui'
import { addMessages } from '../../../app/slices/messagesSlice'
import { updateNewMessage } from '../../../app/slices/socketSlice'
import {
  MessageRequests,
  useAppDispatch,
  useAppSelector,
  useAxiosPrivate,
  UserRequests,
} from 'src/app'

const ChatBox: React.FC<{ props: IChatBoxProps }> = ({ props }) => {
  const dispatch = useAppDispatch()
  const { currentChat, user } = props
  const axiosInstance = useAxiosPrivate()
  const messageRequests = useMemo(
    () => new MessageRequests(axiosInstance),
    [axiosInstance],
  )
  const userRequests = useMemo(
    () => new UserRequests(axiosInstance),
    [axiosInstance],
  )
  const reduxMessages = useAppSelector((state) => state.messageReduce.messages)

  const [recipientUser, setRecipientUser] = useState<IUser | undefined>(
    undefined,
  )
  const [realMessages, setRealMessages] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [messagesIsLoading, setMessagesIsLoading] = useState(false)

  // Get Messages Handler
  const getChatMessagesHandler = useCallback(async () => {
    try {
      setMessagesIsLoading(true)
      if (currentChat?._id === undefined || currentChat._id === '') {
        setMessagesIsLoading(false)
        return
      }

      const fetch = await messageRequests.useGetChatMessages(currentChat._id)

      if (fetch.success) {
        dispatch(
          addMessages({
            messages: fetch.data.messages,
          }),
        )
      } else {
        console.log('Unexpected error')
      }
    } catch (err) {
      console.log(err)
    }
  }, [currentChat._id, dispatch, messageRequests])

  const getRecipientUser = useCallback(async () => {
    try {
      const fetch = await userRequests.useGetRecipientUserQuery(
        currentChat?.members as string[],
        user?._id as string,
      )

      if (fetch.success) {
        const recipientUser = fetch.data as IUser
        setRecipientUser(recipientUser)
      } else {
        console.log('Unexpected error occured!')
      }
    } catch (err) {
      console.log(err)
    }
  }, [currentChat?.members, user?._id, userRequests])

  useEffect(() => {
    if (currentChat && currentChat.members && currentChat.members.length > 0) {
      getRecipientUser()
      getChatMessagesHandler()
    }
  }, [currentChat, user, getRecipientUser, getChatMessagesHandler])

  useEffect(() => {
    setIsLoading(true)
    if (reduxMessages && Array.isArray(reduxMessages)) {
      setRealMessages(reduxMessages)
    }
    setIsLoading(false)
  }, [reduxMessages])

  return (
    <div className="w-full h-full">
      {recipientUser ? (
        <ChatView
          props={{
            messages: realMessages,
            isLoading,
            messagesIsLoading,
            userId: user?._id as string,
            chatId: currentChat?._id as string,
            recipientUser,
          }}
        />
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

const ChatView: React.FC<{ props: IChatViewProps }> = ({
  props,
}): JSX.Element => {
  const { messages, userId, chatId, recipientUser } = props

  const scrollRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()
  const axiosInstance = useAxiosPrivate()
  const messageRequests = useMemo(
    () => new MessageRequests(axiosInstance),
    [axiosInstance],
  )
  const allMessages = useAppSelector((state) => state.messageReduce.messages)
  const [newMessage, setNewMessage] = useState('')
  const [messageIsSending, setMessageIsSending] = useState(false)

  const handleUpdateNewMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const msg = e.target.value
    setNewMessage(msg)
  }

  const handleMessageFormPost = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (newMessage === '') return
      setMessageIsSending(true)
      const msg = newMessage
      setNewMessage('')
      const newMessageData: { chatId: string; senderId: string; text: string } =
        {
          chatId,
          senderId: userId,
          text: msg,
        }

      const fetch = await messageRequests.usePostChatMessages(newMessageData)
      const newMessageToAdd = fetch.data as IMessage
      dispatch(addMessages({ messages: [...allMessages, newMessageToAdd] }))
      dispatch(updateNewMessage({ newMessage: newMessageToAdd }))
    } catch (err) {
      console.log(err)
    } finally {
      setMessageIsSending(false)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleOnScroll = () => {
    const scrollContainer = scrollContainerRef.current?.querySelector('div')

    if (scrollContainer?.scrollTop === 0) {
      console.log('At Top')
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current?.querySelector('div')
    scrollContainer?.addEventListener('scroll', handleOnScroll)

    return () => {
      scrollContainer?.removeEventListener('scroll', handleOnScroll)
    }
  }, [])

  return (
    <section className="relative w-full h-full bg-mx-primary-9 rounded-t-xl rounded-b-md flex flex-col items-start justify-between overflow-hidden">
      {/* Display recipient user name */}
      <div className="w-full py-3 sm:py-2 px-3.5 sm:px-10 flex flex-row items-center justify-start bg-mx-primary-9 shadow-sm">
        <div>
          <img
            alt={recipientUser.email}
            src={recipientUser.imgUri}
            className="w-[50px] sm:w-[70px] h-auto"
          />
        </div>

        <div className="flex flex-col items-start justify-start">
          <p className="text-base font-normal text-mx-black capitalize">
            {recipientUser.fullname}
          </p>

          {/*  */}
          <p className="text-mx-primary-4 font-medium text-xs">Active now</p>
        </div>
      </div>

      {/* Chat Display */}
      <ScrollArea
        ref={scrollContainerRef}
        className="relative w-full h-[80%] min-h-[50vh] pt-3 pb-[15px] flex flex-col-reverse items-end"
      >
        <div className="h-fit w-full flex flex-col px-0 sm:px-6 gap-y-2">
          {messages.map((message, index) => {
            const previousMessage = messages[index - 1] ?? undefined
            const nextMessage = messages[index + 1] ?? undefined

            return (
              <div
                key={index}
                className={clsx([
                  'w-full flex flex-row items-center px-4',
                  {
                    'justify-start': message.senderId._id !== props.userId,
                    'justify-end': message.senderId._id === props.userId,
                  },
                ])}
              >
                <Message
                  props={{
                    message,
                    ref: scrollRef,
                    nextMessage: nextMessage,
                    prevMessage: previousMessage,
                    isMainUserMessage: message.senderId._id === userId,
                  }}
                />
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Input Field */}
      <MessageInputForm
        newMessage={newMessage}
        messageIsSending={messageIsSending}
        handleMessageFormPostCb={handleMessageFormPost}
        handleUpdateNewMessageCb={handleUpdateNewMessage}
      />
    </section>
  )
}

export default ChatBox
