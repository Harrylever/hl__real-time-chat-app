import clsx from 'clsx'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { IMessage, IMessageProps } from 'typings'

const Message: React.FC<{ props: IMessageProps<HTMLDivElement> }> = ({
  props,
}) => {
  const { message, prevMessage, isMainUserMessage, ref } = props
  const [previousMessage, setPreviousMessage] = useState<IMessage | undefined>(
    undefined,
  )

  useEffect(() => {
    if (prevMessage) {
      setPreviousMessage(prevMessage)
    }
  }, [prevMessage])

  return (
    <div
      className={clsx([
        'w-fit flex flex-col',
        {
          'items-start': !isMainUserMessage,
          'items-end': isMainUserMessage,
        },
      ])}
    >
      <div
        ref={ref}
        className={clsx([
          'relative w-fit min-w-[90px] max-w-[200px] sm:max-w-[300px] px-3 py-2 rounded-b-lg flex flex-col gap-y-2',
          {
            'bg-mx-primary-4': isMainUserMessage,
            'bg-white': !isMainUserMessage,
            'rounded-tl-lg':
              (previousMessage &&
                previousMessage.senderId._id !== message.senderId._id &&
                isMainUserMessage) ||
              (!previousMessage && message && isMainUserMessage),
            'rounded-tr-lg':
              (previousMessage &&
                previousMessage.senderId._id !== message.senderId._id &&
                !isMainUserMessage) ||
              (!previousMessage && message && !isMainUserMessage),
            'rounded-t-lg':
              previousMessage &&
              previousMessage.senderId._id === message.senderId._id,
          },
        ])}
      >
        {/* Add triangle mark for first messages in chat */}
        {!previousMessage && message && (
          <div
            className={clsx([
              'absolute top-0 -right-[6px]',
              {
                'custom-right-angle-triangle -right-[6px]': isMainUserMessage,
                'custom-left-angle-triangle -left-[6px]': !isMainUserMessage,
              },
            ])}
          ></div>
        )}

        {/* Add triangle mark for first new messages by each user in chats */}
        {previousMessage &&
          previousMessage.senderId._id !== message.senderId._id && (
            <>
              <div
                className={clsx([
                  'absolute top-0 -right-[6px]',
                  {
                    'custom-right-angle-triangle -right-[6px]':
                      isMainUserMessage,
                    'custom-left-angle-triangle -left-[6px] ':
                      !isMainUserMessage,
                  },
                ])}
              ></div>
            </>
          )}

        {/*  */}
        <div>
          <p
            className={clsx([
              'text-xs md:text-sm',
              {
                'text-mx-grey-2': !isMainUserMessage,
                'text-white': isMainUserMessage,
              },
            ])}
          >
            {message.text}
          </p>
        </div>
      </div>

      {/*  */}
      <small
        className={clsx([
          'text-[0.55rem]/normal lowercase text-right pt-1 text-mx-grey-2',
          {
            'text-left pl-0.5': !isMainUserMessage,
            'text-end pr-1.5': isMainUserMessage,
          },
        ])}
      >
        {moment(message.createdAt as string).format('LT')}
      </small>
    </div>
  )
}

export default Message
