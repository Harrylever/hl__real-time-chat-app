import { useCallback, useMemo } from 'react'
import { IChat, INotification } from 'typings'
import { UnreadNotificationsFunc } from 'src/util/manipulate-notification'
import { useAppDispatch } from 'src/app'
import { updateCurrentChat } from 'src/app/slices/chatSlice'
import { setReduxNotifications } from 'src/app/slices/notificationSlice'

const useNotifications = (
  notifications: INotification[],
  recipientEmail?: string,
) => {
  const dispatch = useAppDispatch()

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

  const markNotificationAsRead = useCallback(
    ({
      notification,
      userChats,
      userEmail,
      notifications,
    }: {
      notification: INotification
      userChats: IChat[]
      userEmail: string
      notifications: INotification[]
    }) => {
      const chatToOpen = userChats.find((chat) => {
        const chatMembers = [userEmail, notification.senderId.email]
        const isChatToOpen = chat.members?.every((member) => {
          return chatMembers.includes(member)
        })

        return isChatToOpen
      })

      // Modified Clicked notification to isRead = true
      const mNotifications = notifications.map((el) => {
        if (notification.senderId === el.senderId) {
          return {
            ...notification,
            isRead: true,
          }
        } else {
          return el
        }
      })

      // Update Modified notification list
      dispatch(
        setReduxNotifications({
          notifications: mNotifications,
        }),
      )

      if (!chatToOpen) return
      dispatch(
        updateCurrentChat({
          ...chatToOpen,
        }),
      )
    },
    [dispatch],
  )

  return { unReadNotifications, thisUserNotifications, markNotificationAsRead }
}

export default useNotifications
