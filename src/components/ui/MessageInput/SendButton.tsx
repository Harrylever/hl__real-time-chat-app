import clsx from 'clsx'

interface SendButtonProps {
  message: string
  messageIsSending: boolean
}
const SendButton: React.FC<SendButtonProps> = ({
  message,
  messageIsSending,
}) => {
  const disabled = message.length === 0 || messageIsSending

  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx([
        'bg-mx-primary h-full w-[52px] rounded-r-lg flex items-center justify-center',
        {
          'opacity-80': message.length < 1,
        },
      ])}
    >
      <img
        src="/svg/message-send-icon.svg"
        alt="send button"
        className="w-[18.5px] h-auto"
      />
    </button>
  )
}

export default SendButton
