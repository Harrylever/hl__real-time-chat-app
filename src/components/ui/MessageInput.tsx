import clsx from 'clsx'
import { ChangeEvent, FormEvent, useState } from 'react'

interface MessageInputFormProps {
  messageIsSending: boolean
}

const MessageInputForm: React.FC<MessageInputFormProps> = ({
  messageIsSending,
}) => {
  const [newMessage, setNewMessage] = useState('')

  const handleSetNewMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const msg = e.target.value
    setNewMessage(msg)
  }

  const handleMessageFormPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="relative w-full h-[100px] bg-mx-primary-9 shadow-inner flex items-center justify-center">
      <form onSubmit={handleMessageFormPost} className="w-full h-fit">
        <div className="relative h-[52px] flex flex-row items-center justify-start px-3.5 sm:px-10 w-full">
          <div className="w-full h-full relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleSetNewMessage}
              placeholder="Type something"
              className="w-full h-full px-3.5 border-none focus:border-none outline-none rounded-l-lg placeholder:text-sm caret-mx-grey text-mx-black text-sm"
            />

            <div className="h-full w-[55px] absolute top-1/2 -translate-y-1/2 right-0 py-2.5">
              <div className="h-full w-full flex flex-row items-center justify-center border-l border-mx-grey">
                <button type="button" className="w-[20px]">
                  <img
                    src="/svg/message-emoji-icon.svg"
                    alt="emoji"
                    className="w-full h-auto"
                  />
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={newMessage.length < 1 || messageIsSending}
            className={clsx([
              'bg-mx-primary h-full w-[52px] rounded-r-lg flex items-center justify-center',
              {
                'opacity-80': newMessage.length < 1 || messageIsSending,
              },
            ])}
          >
            <img
              src="/svg/message-send-icon.svg"
              alt="send button"
              className="w-[18.5px] h-auto"
            />
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInputForm
