import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import SendButton from './SendButton'
// import EmojiPicker from '../EmojiPicker'
import { toast } from '@/components/ui/use-toast'
// import EmojiPickerPopover from 'src/components/popover/EmojiPickerPopover'
import useGetScreenOrientation from 'src/hooks/useGetScreenOrientation'
import clsx from 'clsx'

interface MessageInputFormProps {
  onSubmit: (message: string) => void
  isSending: boolean
  isSuccess: boolean
}

const MessageInputForm: React.FC<MessageInputFormProps> = ({
  onSubmit,
  isSending,
  isSuccess,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [newMessage, setNewMessage] = useState('')

  const { screenOrientation } = useGetScreenOrientation()

  const handleSetNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const msg = e.target.value
    setNewMessage(msg)
  }

  const handleMessageSend = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (!newMessage.trim()) return

    try {
      onSubmit(JSON.stringify(newMessage.trim()))
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not send message',
      })
    }
  }

  useEffect(() => {
    if (!isSending && isSuccess) {
      setNewMessage('')
    }
  }, [isSending, isSuccess])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleMessageSend()
    }
  }

  // const addEmoji = (emoji: string) => {
  //   const cursorPosition = inputRef.current?.selectionStart ?? 0
  //   const updatedMessage =
  //     newMessage.slice(0, cursorPosition) +
  //     emoji +
  //     newMessage.slice(cursorPosition)
  //   setNewMessage(updatedMessage)
  //   inputRef.current?.focus()
  // }

  return (
    <div
      className={clsx(
        'relative w-full bg-mx-primary-9 shadow-inner flex items-center justify-center',
        {
          'h-[100px]': screenOrientation === 'desktop',
          'h-full': screenOrientation !== 'desktop',
        },
      )}
    >
      <form className="w-full h-fit" onSubmit={handleMessageSend}>
        <div className="relative h-[52px] flex items-center justify-start px-3.5 sm:px-10 w-full">
          <div className="w-full h-full relative">
            <textarea
              ref={inputRef}
              name="new-message"
              value={newMessage}
              onChange={handleSetNewMessage}
              onKeyDown={handleKeyPress}
              placeholder="Type something..."
              className="w-full h-full outline-none resize-none overflow-hidden rounded-l-lg placeholder:text-sm caret-mx-grey text-mx-black text-sm flex items-center border border-zinc-300 pt-3.5 pl-3.5 pr-16"
            ></textarea>

            {/* <div className="h-full w-[55px] absolute top-1/2 -translate-y-1/2 right-0 py-2.5 flex items-center justify-center border-l border-mx-grey">
              <EmojiPickerPopover>
                <EmojiPicker hideButton onChange={addEmoji} />
              </EmojiPickerPopover>
            </div> */}
          </div>

          <SendButton message={newMessage} messageIsSending={isSending} />
        </div>
      </form>
    </div>
  )
}

export default MessageInputForm
