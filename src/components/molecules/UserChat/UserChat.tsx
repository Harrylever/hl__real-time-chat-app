import React, { useEffect, useMemo } from 'react'
import { useAppSelector } from '../../../app'
import { userIsOnline } from 'src/util/utils'
import { FetchLatestMessage } from '../../tools'
import UserChatTemplate from './UserChatTemplate'
import { useInView } from 'react-intersection-observer'
import { useGetRecipientUserQuery } from 'src/app/api/hooks'
import { IChat, INotification, UserChatProps } from 'typings'
import { useUpdateCurrentChatHandler } from 'src/components/hooks'
import { UnreadNotificationsFunc } from 'src/util/manipulate-notification'

const useNotifications = (
  notifications: INotification[],
  recipientEmail?: string,
) => {
  const unReadNotifications = useMemo(
    () => UnreadNotificationsFunc(notifications),
    [notifications],
  )

  const thisUserNotifications = useMemo(
    () =>
      unReadNotifications.filter(
        (notif) => notif.senderId.email === recipientEmail,
      ),
    [recipientEmail, unReadNotifications],
  )

  return { unReadNotifications, thisUserNotifications }
}

const UserChat: React.FC<UserChatProps> = ({ chat }) => {
  const user = useAppSelector((state) => state.userReduce.user)
  const notifications = useAppSelector(
    (state) => state.notificationReduce.notifications,
  )
  const currentChat = useAppSelector((state) => state.chatReduce.chat)
  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers)

  const { ref, inView } = useInView()

  const { data, error, isFetching, isLoading, refetch } =
    useGetRecipientUserQuery(
      {
        accountId: user?.email ?? '',
        members: chat?.members ?? [],
      },
      { enabled: true },
    )

  useEffect(() => {
    if (inView) {
      refetch()
    }
  }, [inView, refetch])

  const recipientUser = useMemo(
    () => (data?.success ? data.data : undefined),
    [data],
  )
  const loading = isFetching || isLoading

  const { thisUserNotifications } = useNotifications(
    notifications,
    recipientUser?.email,
  )

  const { updateCurrentChatHandlerWithNotifications } =
    useUpdateCurrentChatHandler()
  const latestMessage = FetchLatestMessage()

  const handleButtonClick = () => {
    updateCurrentChatHandlerWithNotifications(
      chat as IChat,
      notifications,
      thisUserNotifications,
    )
  }

  const isOnline = useMemo(
    () => userIsOnline(recipientUser?.email ?? '', onlineUsers ?? []),
    [onlineUsers, recipientUser?.email],
  )

  if (loading)
    return (
      <div className="border border-blue-100 shadow rounded-lg p-4 max-w-sm w-full mx-auto opacity-70">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-300 h-10 w-10"></div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-300 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    )

  if (error || !recipientUser)
    return (
      <div>
        <p>Error loading recipient</p>
      </div>
    )

  if (recipientUser) {
    return (
      <UserChatTemplate
        ref={ref}
        chat={chat}
        isOnline={isOnline}
        currentChat={currentChat}
        recipientUser={recipientUser}
        latestMessage={latestMessage}
        handleButtonClick={handleButtonClick}
        thisUserNotifications={thisUserNotifications}
      />
    )
  }
}

export default UserChat
