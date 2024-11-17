import React, { useMemo } from 'react'
import { IChat, IUser } from 'typings'
import { useAppSelector } from '../../../app'
import { userIsOnline } from 'src/util/utils'
import UserChatButton from './UserChatButton'
import useNotifications from 'src/hooks/useNotifications'
import useRecipientUser from 'src/hooks/useRecipientUser'
import FetchLatestMessage from 'src/hooks/useFetchLatestMessage'

interface UserChatProps {
  user: IUser
  chat: IChat
}

const UserChat: React.FC<UserChatProps> = ({ user, chat }) => {
  const notifications = useAppSelector(
    (state) => state.notificationReduce.notifications,
  )
  const currentChat = useAppSelector((state) => state.chatReduce.chat)
  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers)

  const { recipientUser, error, loading } = useRecipientUser({
    email: user.email,
    members: chat.members,
  })

  const { thisUserNotifications } = useNotifications(
    notifications,
    recipientUser?.email,
  )
  const latestMessage = FetchLatestMessage()

  const isOnline = useMemo(
    () => userIsOnline(recipientUser?.email ?? '', onlineUsers ?? []),
    [onlineUsers, recipientUser?.email],
  )

  if (loading) return <LoadingSkeleton />
  if (error || !recipientUser) return <p>Error loading recipient</p>

  return (
    <UserChatButton
      chat={chat}
      isOnline={isOnline}
      currentChat={currentChat}
      recipientUser={recipientUser}
      latestMessage={latestMessage}
      thisUserNotifications={thisUserNotifications}
    />
  )
}

const LoadingSkeleton = () => {
  return (
    <div className="border border-blue-100 shadow rounded-lg p-4 max-w-sm w-full mx-auto opacity-60">
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
}

export default UserChat
