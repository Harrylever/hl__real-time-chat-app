import { INotification } from '../../typings'

function UnreadNotificationsFunc(notifications: INotification[]) {
  return notifications.filter((notif) => notif.isRead === false)
}

export { UnreadNotificationsFunc }
