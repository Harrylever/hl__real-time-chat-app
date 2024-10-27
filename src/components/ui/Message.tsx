import clsx from 'clsx'
import moment from 'moment'
import React from 'react'
import { IMessage } from 'typings'

interface MessageProps<T> {
  prevMessage?: IMessage
  nextMessage?: IMessage
  message: IMessage
  isMainUserMessage: boolean
  ref?: React.LegacyRef<T>
}

const Message: React.FC<MessageProps<HTMLDivElement>> = ({
  ref,
  message,
  prevMessage,
  isMainUserMessage,
}) => {
  const isNewMessage =
    !prevMessage || prevMessage.senderId.email !== message.senderId.email

  // Common styles for the message bubble
  const messageBubbleClasses = clsx(
    'relative w-fit min-w-[90px] max-w-[200px] sm:max-w-[300px] px-3 py-2 rounded-b-lg flex flex-col gap-y-2',
    {
      'bg-mx-primary-4': isMainUserMessage,
      'bg-white': !isMainUserMessage,
      'rounded-tl-lg': isMainUserMessage && isNewMessage,
      'rounded-tr-lg': !isMainUserMessage && isNewMessage,
      'rounded-t-lg': !isNewMessage,
    },
  )

  // Triangle marker for first messages in chat or new messages from a different user
  const triangleMarkerClasses = clsx('absolute top-0', {
    'custom-right-angle-triangle -right-[6px]': isMainUserMessage,
    'custom-left-angle-triangle -left-[6px]': !isMainUserMessage,
  })

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
      <div ref={ref} className={messageBubbleClasses}>
        {/* Show triangle marker for the first or new message */}
        {isNewMessage && <div className={triangleMarkerClasses}></div>}

        {/* Message Text */}
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

      {/* Timestamp */}
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
