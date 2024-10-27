import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { IMessage, IUser } from 'typings'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { AnimatePresence, motion } from 'framer-motion'
import { Message, MessageInputForm } from 'src/components/ui'
import { IoIosInformationCircleOutline } from 'react-icons/io'

interface ChatViewProps {
  messages: IMessage[]
  userEmail: string
  recipientUser: IUser
}

const ChatView: React.FC<ChatViewProps> = ({
  messages,
  userEmail,
  recipientUser,
}): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current?.querySelector('div')

    const handleOnScroll = () => {
      if (scrollContainer?.scrollTop === 0) {
        console.log('At Top')
      }
    }

    scrollContainer?.addEventListener('scroll', handleOnScroll)
    return () => scrollContainer?.removeEventListener('scroll', handleOnScroll)
  }, [])

  // Classes for message alignment and chat container
  const messageContainerClasses = (isMainUser: boolean) =>
    clsx('w-full flex flex-row items-center px-4', {
      'justify-start': !isMainUser,
      'justify-end': isMainUser,
    })

  return (
    <section className="relative w-full h-full bg-mx-primary-9 rounded-t-xl rounded-b-md flex flex-col items-start justify-between overflow-hidden">
      {/* Display recipient user info */}
      <div className="py-3 sm:py-2 px-3.5 sm:px-10  w-full flex items-center justify-between shadow-sm">
        <div className="w-full flex items-center justify-start space-x-2">
          <div>
            <img
              alt={recipientUser.email}
              src={recipientUser.profileImage}
              className="w-[50px] sm:w-[50px] h-auto"
            />
          </div>

          <div className="flex flex-col items-start justify-start">
            <p className="text-sm font-normal text-mx-black capitalize">
              {recipientUser.fullname}
            </p>

            {/*  */}
            <p className="text-mx-primary-4 font-normal text-xs">Active now</p>
          </div>
        </div>

        <button type="button">
          <IoIosInformationCircleOutline size={21} />
        </button>
      </div>

      {/* Chat Display */}
      <ScrollArea
        ref={scrollContainerRef}
        className="relative w-full h-[80%] min-h-[50vh] pt-3 pb-[15px] flex flex-col-reverse items-end"
      >
        <AnimatePresence>
          <div className="h-fit w-full flex flex-col px-0 sm:px-6 gap-y-2">
            {messages.map((message, index) => {
              const prevMessage = messages[index - 1]
              const nextMessage = messages[index + 1]
              const isMainUser = message.senderId.email === userEmail

              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 1 }}
                  transition={{
                    opacity: { duration: 0.1 },
                    layout: {
                      type: 'spring',
                      bounce: 0.3,
                      duration: index * 0.05 + 0.2,
                    },
                  }}
                  className={messageContainerClasses(isMainUser)}
                >
                  <Message
                    message={message}
                    ref={scrollRef}
                    nextMessage={nextMessage}
                    prevMessage={prevMessage}
                    isMainUserMessage={isMainUser}
                  />
                </motion.div>
              )
            })}
          </div>
        </AnimatePresence>
      </ScrollArea>

      {/* Input Field */}
      <MessageInputForm />
    </section>
  )
}

export default ChatView
