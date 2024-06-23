import clsx from 'clsx'
import moment from 'moment'
import { FetchLatestMessage } from '../../tools'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useUpdateCurrentChatHandler } from 'src/components/hooks'
import { IChat, IUser, INotification, IUserChatProps } from 'typings'
import { UnreadNotificationsFunc } from 'src/util/manipulate-notification'
import { useAppSelector, useAxiosPrivate, UserRequests } from '../../../app'

const UserChat: React.FC<{ props: IUserChatProps }> = ({
  props: { user, chat },
}) => {
  const axiosInstance = useAxiosPrivate()
  const userRequests = useMemo(
    () => new UserRequests(axiosInstance),
    [axiosInstance],
  )

  const [recipientUser, setRecipientUser] = useState<IUser | undefined>(
    undefined,
  )
  const [unReadNotifications, setUnReadNotifications] = useState<
    INotification[]
  >([])
  const [thisUserNotifications, setThisUserNotifications] = useState<
    INotification[]
  >([])

  const [, setIsLoading] = useState(false)

  const getRecipientUserProcess = useCallback(() => {
    setIsLoading(true)
    const recipientId = chat?.members?.find((id) => id !== user?._id)

    if (!recipientId) return null
    const fetch = userRequests.useGetUserByIdQuery(recipientId)
    fetch
      .then((res) => {
        if (res.success) {
          setRecipientUser(res.data as IUser)
        } else {
          console.log('Unexpected error occured')
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [chat?.members, user?._id, userRequests])

  useEffect(() => {
    getRecipientUserProcess()
  }, [getRecipientUserProcess])

  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers)
  const isOnline =
    onlineUsers &&
    onlineUsers.some((user) => user.userId === recipientUser?._id)

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
      (notif) => notif.senderId._id === recipientUser?._id,
    )
    setThisUserNotifications(newThisUserNotifications)
  }, [recipientUser?._id, unReadNotifications])

  const [, updateCurrentChatHandlerWithNotifications] =
    useUpdateCurrentChatHandler()

  const latestMessage = FetchLatestMessage(chat as IChat)

  const truncateText = (text: string) => {
    let shortText = text.substring(0, 20)

    if (text.length > 20) {
      shortText = shortText + '...'
    }
    return shortText
  }

  const currentChat = useAppSelector((state) => state.chatReduce.chat)

  return (
    <button
      type="button"
      onClick={() =>
        updateCurrentChatHandlerWithNotifications(
          chat as IChat,
          notifications,
          thisUserNotifications,
        )
      }
      className={clsx([
        'flex flex-row items-center justify-between w-full max-w-full border-b border-[#ffffff2d] py-0.5 sm:py-2 pl-1 pr-3 rounded-lg hover:bg-mx-primary-8 duration-150',
        { 'bg-mx-primary-8': currentChat._id === chat?._id },
      ])}
    >
      <div className="flex flex-row items-center justify-center gap-x-2.5">
        <div className="w-fit border-2 border-[#ffffff73] rounded-full hover:border-white relative">
          <img
            src={recipientUser?.imgUri}
            alt={recipientUser?.username}
            className="rounded-full h-[50px] w-[50px] shadow-lg overflow-hidden"
          />
          {isOnline && (
            <div className="rounded-full h-[10px] w-[10px] bg-mx-primary-4 absolute bottom-[8%] left-[75%]"></div>
          )}
        </div>
        <div className="flex flex-col gap-2.5 items-start justify-center mt-1">
          <div>
            <p className="text-mx-black font-medium text-sm/[0.6rem] sm:text-sm/[0.7rem] tracking-wide capitalize">
              {recipientUser?.username && recipientUser.username.length > 10
                ? `${recipientUser?.username.substring(0, 7)}..`
                : recipientUser?.username}
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
            'gap-0.5': thisUserNotifications.length > 0,
            'gap-4': thisUserNotifications.length === 0,
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
          {thisUserNotifications.length > 0 && (
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
