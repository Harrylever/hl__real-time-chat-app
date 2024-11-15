import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import Message from '.'
import { IUser } from 'typings'
import { useAppSelector } from 'src/app'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import useGetScreenOrientation from 'src/hooks/useGetScreenOrientation'

interface MessageWrapperProps {
  user: IUser
}

const MessageWrapper: React.FC<MessageWrapperProps> = ({ user }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { messages } = useAppSelector((state) => state.messageReduce)

  const { screenOrientation } = useGetScreenOrientation()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Classes for message alignment and chat container
  const messageContainerClasses = (isMainUser: boolean) =>
    clsx('w-full flex flex-row items-center px-4', {
      'justify-start': !isMainUser,
      'justify-end': isMainUser,
    })

  return (
    <ScrollArea
      ref={scrollContainerRef}
      className={clsx(
        'relative w-full h-[80%] min-h-[50vh] pt-3 pb-[15px] flex flex-col-reverse items-end',
        {
          'h-[80%]': screenOrientation === 'desktop',
          'h-full': screenOrientation !== 'desktop',
        },
      )}
    >
      <AnimatePresence>
        <div className="h-fit w-full flex flex-col px-0 sm:px-6 gap-y-2">
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1]
            const nextMessage = messages[index + 1]
            const isMainUser = message.senderId.email === user.email

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  opacity: { duration: 0.2 },
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
                  messageRef={scrollRef}
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
  )
}

export default MessageWrapper
