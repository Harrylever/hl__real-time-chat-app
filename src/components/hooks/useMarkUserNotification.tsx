import { useCallback } from 'react'
import { INotification } from 'typings'
import { useAppDispatch } from 'src/app'
import { setReduxNotifications } from 'src/app/slices/notificationSlice'

const useMarkUserNotificationsHandler = () => {
  const dispatch = useAppDispatch()

  // Mark All Notifications for Specific sender
  const markThisUserNotfications = useCallback(
    (
      notificationsParam: INotification[],
      thisUserNotificationsParam: INotification[],
    ) => {
      const mNotifications = notificationsParam.map((el) => {
        let notification: INotification | undefined = undefined

        thisUserNotificationsParam.forEach((notif) => {
          if (notif.senderId._id === el.senderId._id) {
            notification = {
              ...notif,
              isRead: true,
            }
          } else {
            notification = el
          }
        })

        return notification as unknown as INotification
      })

      dispatch(
        setReduxNotifications({
          notifications: mNotifications,
        }),
      )
    },
    [dispatch],
  )

  return [markThisUserNotfications]
}

export default useMarkUserNotificationsHandler
