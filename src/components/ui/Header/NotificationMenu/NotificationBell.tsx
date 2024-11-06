import React from 'react'
import { INotification } from 'typings'
import { BellIcon } from '@heroicons/react/24/outline'

interface NotificationBellProps {
  notifications: INotification[]
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications,
}) => {
  const unreadCount = notifications.map((notif) => !notif.isRead).length

  return (
    <div className="relative flex items-center">
      <BellIcon className="h-7 w-7" aria-hidden="true" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-primary rounded-full w-4 h-4 flex items-center justify-center text-xs font-semibold">
          {unreadCount}
        </span>
      )}
    </div>
  )
}

export default NotificationBell
