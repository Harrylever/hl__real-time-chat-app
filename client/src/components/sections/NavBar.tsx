import {  Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useLocation, Link } from 'react-router-dom';
import { IUser } from '../../../typings';
import useLogOutUser from '../../app/hooks/useLogOutUser';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar({ user }: { user?: IUser }) {
  const location = useLocation();
  const logOut = useLogOutUser();

  const [localUser, setLocalUser] = useState<IUser>({})
  const [userExists, setUserExists] = useState(false);
  const [route, setRoute] = useState('');

  const [userNavigationList, setUserNavigationList] = useState<{
    id: number;
    name: string;
    action: () => void
      }[]>([]);

  const sendLocation = (value: string) => {
    window.location.assign(value);
  }

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
  }, [location, user]);

  return (
    <div>
      <Disclosure as="nav" className="bg-slate-900">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <h2 className="text-start text-xl sm:text-3xl lg:text-4xl font-semibold">
                      Chat App
                    </h2>
                  </div>
                </div>

                {/*  */}
                {userExists ? (
                  <LgMenuComponent localUser={localUser} userNavigationList={userNavigationList} />
                ) : (
                  <div className="hidden md:block">
                    <Link
                      to={route === '/login' ? '/register' : '/login'}
                      className="text-gray-300 font-medium text-lg tracking-tight"
                    >
                      {route === '/login' ? 'Register' : 'Login'}
                    </Link>
                  </div>
                )}

                {/*  */}
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                      <div className="text-base font-medium leading-none text-white">
                        {localUser.username}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {localUser.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigationList.map((item) => (
                      <Disclosure.Button
                        key={item.id}
                        as="button"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={item.action}
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
                    className="text-gray-300 font-medium text-lg tracking-tight"
                  >
                    {route === '/login' ? 'Register' : 'Login'}
                  </Link>
                </div>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>{' '}
    </div>
  );
}

function LgMenuComponent({ localUser, userNavigationList }: { localUser: IUser,  userNavigationList: {
  id: number;
  name: string;
  action: () => void
    }[] }) {
  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-0.5 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>

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
                        'block px-4 py-2 text-sm text-gray-700'
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
  )
}