import clsx from 'clsx'
import moment from 'moment'
import { useMemo } from 'react'
import { useAppDispatch } from 'src/app'
import { truncateText } from 'src/util/utils'
import { updateCurrentChat } from 'src/app/slices/chatSlice'
import { IChat, IMessage, INotification, IUser } from 'typings'

interface UserChatButtonProps {
  chat: IChat
  recipientUser: IUser
  currentChat?: IChat
  isOnline: boolean
  latestMessage?: IMessage
  thisUserNotifications: INotification[]
}

const UserChatButton: React.FC<UserChatButtonProps> = ({
  chat,
  isOnline,
  recipientUser,
  currentChat,
  latestMessage,

  thisUserNotifications,
}) => {
  const dispatch = useAppDispatch()
  const thisUserNotificationsExists = useMemo(
    () => thisUserNotifications.length > 0,
    [thisUserNotifications.length],
  )

  const onClick = () => {
    dispatch(updateCurrentChat(chat))
  }

  return (
    <button
      type="button"
      onClick={onClick}
      name={`chat-button-${chat.id}`}
      className={clsx([
        'group/user-button flex flex-row items-center justify-between w-full max-w-full border-b border-[#ffffff2d] py-0.5 sm:py-2 pl-1 pr-3 rounded-lg hover:bg-mx-primary-8 duration-150',
        { 'bg-mx-primary-8/50': currentChat?.id === chat.id },
      ])}
    >
      <div className="flex flex-row items-center justify-center gap-x-2.5">
        <div className="w-fit border-1 border-[#ffffff1a] rounded-full group-hover/user-button:border-white relative">
          <img
            src={recipientUser.profileImage}
            alt={recipientUser.username}
            className="rounded-full h-[50px] w-[50px] overflow-hidden"
          />
          {isOnline && (
            <div className="rounded-full h-[10px] w-[10px] bg-mx-primary-4 absolute bottom-[8%] left-[75%]"></div>
          )}
        </div>
        <div className="flex flex-col gap-2.5 items-start justify-center mt-1">
          <div>
            <p className="text-mx-black font-medium text-sm/[0.6rem] sm:text-sm/[0.7rem] tracking-wide capitalize">
              {`${recipientUser.firstname} ${recipientUser.lastname}`}
            </p>
          </div>

          <div>
            <p className="text-[0.7rem]/[0.5rem] sm:text-xs/[0.7rem] font-normal text-mx-grey-2">
              {latestMessage
                ? truncateText(latestMessage.text)
                : 'Send a message'}
            </p>
          </div>
        </div>
      </div>

      <div
        className={clsx([
          'flex flex-col items-end justify-between mt-2 h-full min-h-[45px] gap-y-1.5',
          {
            'gap-0.5': thisUserNotificationsExists,
            'gap-4': !thisUserNotificationsExists,
          },
        ])}
      >
        <div className="h-1/2">
          <p className="block text-[0.7rem] text-mx-black">
            {latestMessage
              ? moment(latestMessage.createdAt as string).format('LLL')
              : ''}
          </p>
        </div>

        <div className="h-1/2">
          {thisUserNotificationsExists && (
            <div className="bg-mx-primary h-[16px] w-[16px] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {thisUserNotifications.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export default UserChatButton
