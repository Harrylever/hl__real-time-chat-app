import clsx from 'clsx'
import { ChatViewProps } from 'typings'
import { useEffect, useRef } from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Message, MessageInputForm } from 'src/components/ui'

const ChatView: React.FC<ChatViewProps> = ({
  messages,
  userEmail,
  recipientUser,
}): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null)

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
                    'justify-start': message.senderId.email !== userEmail,
                    'justify-end': message.senderId.email === userEmail,
                  },
                ])}
              >
                <Message
                  props={{
                    message,
                    ref: scrollRef,
                    nextMessage: nextMessage,
                    prevMessage: previousMessage,
                    isMainUserMessage: message.senderId.email === userEmail,
                  }}
                />
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Input Field */}
      <MessageInputForm messageIsSending={true} />
    </section>
  )
}

export default ChatView
