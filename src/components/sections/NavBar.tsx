import moment from 'moment';
import { useLocation, Link } from 'react-router-dom';
import useLogOutUser from '../../app/hooks/useLogOutUser';
import { useAppDispatch, useAppSelector } from '../../app';
import { updateCurrentChat } from '../../app/slices/chatSlice';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { setReduxNotifications } from '../../app/slices/notificationSlice';
import { IChat, INavBarProps, INotification, IUser } from '../../../typings';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UnreadNotificationsFunc } from '../../util/manipulate-notification';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NavBar: React.FC<{ props: INavBarProps }> = ({ props: { user } }) => {
  const location = useLocation();
  const logOut = useLogOutUser();

  const [localUser, setLocalUser] = useState<IUser>({});
  const [userExists, setUserExists] = useState(false);
  const [route, setRoute] = useState('');

  const [userNavigationList, setUserNavigationList] = useState<
    {
      id: number;
      name: string;
      action: () => void;
        }[]
        >([]);

  const sendLocation = (value: string) => {
    window.location.assign(value);
  };

  useEffect(() => {
    // Set Route
    setRoute(location.pathname);
    const navigationList = [];

    // Update user details in state
    if (user && user._id !== '') {
      setLocalUser(user);
      setUserExists(true);

      navigationList.push({
        id: 1,
        name: 'Your profile',
        action: () => {
          sendLocation(`/account/${user.email}`);
        },
      });
      navigationList.push({
        id: 2,
        name: 'Settings',
        action: () => {
          sendLocation('/settings');
        },
      });
      navigationList.push({
        id: 3,
        name: 'Sign out',
        action: () => {
          logOut();
        },
      });

      setUserNavigationList(navigationList);
    } else {
      setLocalUser({});
      setUserExists(false);
    }
    // Don't add the logOut variable as a dependency
  }, [location, user]);

  return (
    <div className="w-full">
      <Disclosure as="nav" className="py-6 sm:h-[12vh] w-full flex flex-col sm:flex-row justify-center bg-transparent">
        {({ open }) => (
          <>
            <div className="mx-auto w-full max-w-7xl flex justify-center">
              <div className="w-full flex items-center justify-between">
                <Link to={'/'}>
                  <div className="flex items-center">
                    <img
                      src="/svg/mxchat-new-logo.svg"
                      alt=""
                      className="w-[180px] md:w-[210px]"
                    />
                  </div>
                </Link>

                {/*  */}
                {userExists ? (
                  <LgMenuComponent
                    localUser={localUser}
                    userNavigationList={userNavigationList}
                  />
                ) : (
                  <div className="hidden md:block">
                    <Link to={route === '/login' ? '/register' : '/login'}>
                      <div className="group border border-blue-3 hover:bg-indigo-600 duration-500 rounded-sm py-2.5 px-16">
                        <p className="text-mx-primary group-hover:text-mx-white font-semibold text-sm tracking-tight">
                          {route === '/login' ? 'Sign up' : 'Login'}
                        </p>
                      </div>
                    </Link>
                  </div>
                )}

                {/*  */}
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-mx-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {userExists ? (
              <Disclosure.Panel className="md:hidden">
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={localUser.imgUri}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-mx-white">
                        {localUser.username}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {localUser.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-mx-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigationList.map((item) => (
                      <Disclosure.Button
                        as="button"
                        key={item.id}
                        onClick={item.action}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-mx-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            ) : (
              <Disclosure.Panel className="md:hidden pt-2">
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <Link
                    to={route === '/login' ? '/register' : '/login'}
                  >
                    <p className="text-mx-primary font-semibold text-base tracking-wide">
                      {route === '/login' ? 'Register' : 'Login'}
                    </p>
                  </Link>
                </div>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    </div>
  );
};

function LgMenuComponent({
  localUser,
  userNavigationList,
}: {
  localUser: IUser;
  userNavigationList: {
    id: number;
    name: string;
    action: () => void;
  }[];
}) {
  const dispatch = useAppDispatch();
  const [unreadNotifications, setUnreadNotifications] = useState<
    INotification[]
  >([]);

  const notifications = useAppSelector(
    (state) => state.notificationReduce.notifications
  );

  useEffect(() => {
    const unreadNotificationList = UnreadNotificationsFunc(notifications);
    setUnreadNotifications(unreadNotificationList);
  }, [notifications]);

  const markAllNotificationsAsRead = useCallback((notifications: INotification[]) => {
    const mNotifications = notifications.map((notif) => {
      return { ...notif, isRead: true };
    })

    dispatch(
      setReduxNotifications({ notifications: mNotifications })
    )
  }, [dispatch]);

  const markNotificationAsRead = useCallback(
    (
      notification: INotification,
      userChats: IChat[],
      user: IUser,
      notifications: INotification[]
    ) => {
      const chatToOpen = userChats.find((chat) => {
        const chatMembers = [user._id, notification.senderId._id];
        const isChatToOpen = chat.members?.every((member) => {
          return chatMembers.includes(member);
        });

        return isChatToOpen;
      })

      // Modified Clicked notification to isRead = true
      const mNotifications = notifications.map((el) => {
        if (notification.senderId === el.senderId) {
          return {
            ...notification,
            isRead: true,
          };
        } else {
          return el;
        }
      })

      // Update Modified notification list 
      dispatch(
        setReduxNotifications({
          notifications: mNotifications,
        })
      );

      if (!chatToOpen) return;
      dispatch(
        updateCurrentChat({
          chat: chatToOpen,
        })
      ); 
    },
    [dispatch]
  );

  const user = useAppSelector((state) => state.userReduce);
  const userChats = useAppSelector((state) => state.userChatsReduce.chats);
  
  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        {/* Notification Dropdown */}
        <Menu as="div" className={'relative ml-4'}>
          <div>
            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              {unreadNotifications.length > 0 && (
                <div className="absolute -top-[40%] -right-[30%] bg-white text-mx-primary rounded-full w-[15.7px] h-[15.7px] flex items-center justify-center">
                  <span className="text-xs font-semibold">
                    {unreadNotifications.length}
                  </span>
                </div>
              )}
              <BellIcon className="h-6 w-6" aria-hidden="true" />
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
                    onClick={() => markAllNotificationsAsRead(notifications)}
                    className="bg-transparent text-mx-primary text-base font-normal"
                  >
                    <span>Mark all as read</span>
                  </button>
                </div>
              </Menu.Item>

              {/* Handle notification list */}
              {notifications.map((notification, index) => (
                <Menu.Item key={index}>
                  <Menu.Button
                    onClick={() => markNotificationAsRead(notification, userChats, user, notifications )}
                    className={classNames(
                      notification.isRead ? '' : 'bg-gray-100',
                      'w-full flex flex-col px-5 py-2 text-sm text-gray-700 cursor-pointer'
                    )}
                  >
                    <p className="">
                      <span className=" capitalize mr-1 font-medium">
                        {notification.senderId.fullname}
                      </span>
                      sent you message
                    </p>
                    <p className="mt-0.5 text-xs">
                      {moment(notification.date as string).calendar()}
                    </p>
                  </Menu.Button>
                </Menu.Item>
              ))}

              {/* If no notification in notification list */}
              {notifications.length < 1 && (
                <Menu.Item>
                  <button
                    type="button"
                    className={classNames(
                      'w-full flex px-5 py-2 text-sm text-gray-700'
                    )}
                  >
                    No Notification
                  </button>
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </Menu>

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-4">
          <div>
            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <img
                className="h-9 w-9 rounded-full"
                src={localUser.imgUri}
                alt="Profile Image"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigationList.map((item) => (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'w-full flex px-4 py-2 text-sm text-gray-700'
                      )}
                      onClick={item.action}
                    >
                      {item.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default NavBar;
