import { Fragment, useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { INotification } from 'typings'
import UserProfileIcon from './UserProfileIcon'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from 'src/app'
import { setReduxNotifications } from 'src/app/slices/notificationSlice'
import { UnreadNotificationsFunc } from 'src/util/manipulate-notification'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const NotificationMenu = () => {
  const { user } = useAppSelector((state) => state.userReduce)
  const dispatch = useAppDispatch()
  const [unreadNotifications, setUnreadNotifications] = useState<
    INotification[]
  >([])

  const notifications = useAppSelector(
    (state) => state.notificationReduce.notifications,
  )

  useEffect(() => {
    const unreadNotificationList = UnreadNotificationsFunc(notifications)
    setUnreadNotifications(unreadNotificationList)
  }, [notifications])

  const markAllNotificationsAsRead = useCallback(
    (notifications: INotification[]) => {
      const mNotifications = notifications.map((notif) => {
        return { ...notif, isRead: true }
      })

      dispatch(setReduxNotifications({ notifications: mNotifications }))
    },
    [dispatch],
  )

  //   const { markNotificationAsRead } = useNotifications()

  const hasNotifications = notifications.length > 0

  return (
    <div className="ml-4 flex items-center gap-7">
      {/* Notification Dropdown */}
      <Menu as="div" className="relative ml-4">
        <div>
          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-mx-white text-sm focus:outline-none ring-0 ring-transparent">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            {unreadNotifications.length > 0 && (
              <div className="absolute -top-[40%] -right-[30%] bg-white text-mx-primary rounded-full w-[15.7px] h-[15.7px] flex items-center justify-center">
                <span className="text-xs font-semibold">
                  {unreadNotifications.length}
                </span>
              </div>
            )}
            <BellIcon className="h-7 w-7" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in dduration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-[400px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <div className="flex flex-row items-center justify-between py-1.5 px-5">
                <p className="text-mx-primary text-lg font-semibold">
                  Notifications
                </p>

                <button
                  name="mark-all-as-read-button"
                  onClick={() => markAllNotificationsAsRead(notifications)}
                  className="bg-transparent text-mx-primary text-base font-normal"
                >
                  <span>Mark all as read</span>
                </button>
              </div>
            </Menu.Item>

            {/* Handle notification list */}
            {notifications.map((notification, index) => (
              <Menu.Item
                key={index}
                as="button"
                // onClick={() => {}}
                //   markNotificationAsRead(
                //     notification,
                //     userChats,
                //     localUser.email,
                //     notifications,
                //   )
                // }
                className={classNames(
                  notification.isRead ? '' : 'bg-gray-100',
                  'w-full flex flex-col px-5 py-2 text-sm text-gray-700 cursor-pointer',
                )}
              >
                <p>
                  <span className=" capitalize mr-1 font-medium">
                    {`${notification.senderId.firstname} ${notification.senderId.lastname}`}
                  </span>
                  sent you message
                </p>
                <p className="mt-0.5 text-xs">
                  {moment(notification.date as string).calendar()}
                </p>
              </Menu.Item>
            ))}

            {/* If no notification in notification list */}
            {!hasNotifications && (
              <Menu.Item
                as="p"
                className="w-full flex px-5 py-2 text-sm text-gray-700"
              >
                No Notification
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Profile dropdown */}
      {user && <UserProfileIcon user={user} />}
    </div>
  )
}

export default NotificationMenu
