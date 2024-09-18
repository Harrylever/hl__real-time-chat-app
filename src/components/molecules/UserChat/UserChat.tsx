import clsx from 'clsx'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../../app'
import { FetchLatestMessage } from '../../tools'
import { truncateText, userIsOnline } from 'src/util/utils'
import { IChat, INotification, UserChatProps } from 'typings'
import { useUpdateCurrentChatHandler } from 'src/components/hooks'
import { UnreadNotificationsFunc } from 'src/util/manipulate-notification'

const UserChat: React.FC<UserChatProps> = ({ chat, recipientUser }) => {
  const [unReadNotifications, setUnReadNotifications] = useState<
    INotification[]
  >([])
  const [thisUserNotifications, setThisUserNotifications] = useState<
    INotification[]
  >([])

  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers)

  const notifications = useAppSelector(
    (state) => state.notificationReduce.notifications,
  )

  // Update all unread messages
  useEffect(() => {
    const newUnReadNotifications = UnreadNotificationsFunc(notifications)
    setUnReadNotifications(newUnReadNotifications)
  }, [notifications])

  // Update User Notification for Specific Sender
  useEffect(() => {
    const newThisUserNotifications = unReadNotifications.filter(
      (notif) => notif.senderId.email === recipientUser?.email,
    )
    setThisUserNotifications(newThisUserNotifications)
  }, [recipientUser?.email, unReadNotifications])

  const { updateCurrentChatHandlerWithNotifications } =
    useUpdateCurrentChatHandler()

  const latestMessage = FetchLatestMessage()

  const currentChat = useAppSelector((state) => state.chatReduce.chat)
  const isOnline = userIsOnline(recipientUser.email ?? '', onlineUsers ?? [])
  const thisUserNotificationsExists = useMemo(
    () => thisUserNotifications.length > 0,
    [thisUserNotifications.length],
  )

  const handleButtonClick = () => {
    updateCurrentChatHandlerWithNotifications(
      chat as IChat,
      notifications,
      thisUserNotifications,
    )
  }

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      className={clsx([
        'flex flex-row items-center justify-between w-full max-w-full border-b border-[#ffffff2d] py-0.5 sm:py-2 pl-1 pr-3 rounded-lg hover:bg-mx-primary-8 duration-150',
        { 'bg-mx-primary-8': currentChat?._id === chat?._id },
      ])}
    >
      <div className="flex flex-row items-center justify-center gap-x-2.5">
        <div className="w-fit border-2 border-[#ffffff73] rounded-full hover:border-white relative">
          <img
            src={recipientUser.imgUri}
            alt={recipientUser.username}
            className="rounded-full h-[50px] w-[50px] shadow-lg overflow-hidden"
          />
          {isOnline && (
            <div className="rounded-full h-[10px] w-[10px] bg-mx-primary-4 absolute bottom-[8%] left-[75%]"></div>
          )}
        </div>
        <div className="flex flex-col gap-2.5 items-start justify-center mt-1">
          <div>
            <p className="text-mx-black font-medium text-sm/[0.6rem] sm:text-sm/[0.7rem] tracking-wide capitalize">
              {recipientUser.username && recipientUser.username.length > 10
                ? `${recipientUser.username.substring(0, 7)}..`
                : recipientUser.username}
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

export default UserChat
