import { ChangeEvent, useRef, useState } from 'react'
import clsx from 'clsx'
import EmojiPicker from './EmojiPicker'
import { useAppSelector } from 'src/app'
import { useToast } from '@/components/ui/use-toast'
import { usePostChatMessageMutation } from 'src/app/api/hooks'
import { IPostChatMessageValues } from 'src/app/api/actions/message'

interface MessageInputFormProps {}

const MessageInputForm: React.FC<MessageInputFormProps> = () => {
  const { toast } = useToast()
  const [newMessage, setNewMessage] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const user = useAppSelector((state) => state.userReduce.user)
  const currentChat = useAppSelector((state) => state.chatReduce.chat)

  const { mutateAsync: sendMessage, isPending: messagesIsSending } =
    usePostChatMessageMutation()

  const handleSetNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const msg = e.target.value
    setNewMessage(msg)
  }

  const handleMessageSend = async () => {
    try {
      if (!currentChat || !user) return

      const data: IPostChatMessageValues = {
        text: newMessage,
        senderId: user.email as string,
        chatId: currentChat.id as string,
      }
      const response = await sendMessage(data)

      if (response.data) {
        //
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: 'Error sending message',
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleMessageSend()
    }

    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      setNewMessage((prev) => prev + '\n')
    }
  }

  return (
    <div className="relative w-full h-[100px] bg-mx-primary-9 shadow-inner flex items-center justify-center">
      <form className="w-full h-fit">
        <div className="relative h-[52px] flex flex-row items-center justify-start px-3.5 sm:px-10 w-full">
          <div className="w-full h-full relative">
            <textarea
              autoComplete="off"
              ref={inputRef}
              name="new-message"
              onKeyDown={handleKeyPress}
              value={newMessage}
              onChange={handleSetNewMessage}
              placeholder="Type something..."
              className="w-full h-full outline-none resize-none overflow-hidden rounded-l-lg placeholder:text-sm caret-mx-grey text-mx-black text-sm flex items-center border border-zinc-300 pt-3.5 pl-3.5 pr-16"
            ></textarea>

            <div className="h-full w-[55px] absolute top-1/2 -translate-y-1/2 right-0 py-2.5">
              <div className="h-full w-full flex flex-row items-center justify-center border-l border-mx-grey">
                <EmojiPicker
                  onChange={(value) => {
                    setNewMessage(newMessage + value)
                    if (inputRef.current) {
                      inputRef.current.focus()
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={newMessage.length < 1 || messagesIsSending}
            className={clsx([
              'bg-mx-primary h-full w-[52px] rounded-r-lg flex items-center justify-center',
              {
                'opacity-80': newMessage.length < 1,
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
