import React, { useState } from 'react'
import clsx from 'clsx'
import { MdClose } from 'react-icons/md'
import { useAppDispatch } from 'src/app'
import { ComingSoon } from 'src/components/ui'
import { IUser, TInViewTab } from 'typings'
import { setSideBarChatDisplay } from 'src/app/slices/appUIStateSlice'

interface ISideBarChatListProps {
  user: IUser
}

type TInViewTabProps = {
  name: TInViewTab
  isMsgView: boolean
  icon: { active: string; inactive: string }
}

const SideBarChatList: React.FC<ISideBarChatListProps> = ({ user }) => {
  const dispatch = useAppDispatch()
  const [inViewTabActive, setInViewTabActive] = useState<TInViewTab>('chats')

  const inViewtabs: TInViewTabProps[] = [
    {
      name: 'chats',
      isMsgView: true,
      icon: {
        active: '/svg/active/chat-view-icon.svg',
        inactive: '/svg/inactive/chat-view-icon.svg',
      },
    },
    {
      name: 'groups',
      isMsgView: true,
      icon: {
        active: '/svg/active/groups-view-icon.svg',
        inactive: '/svg/inactive/groups-view-icon.svg',
      },
    },
  ]

  const InViewObjectMap: Record<TInViewTab, JSX.Element | null> = {
    chats: <ChatsView />,
    groups: <GroupsView />,
  }

  const handleOnInViewBtnClick = (view: TInViewTab) => {
    setInViewTabActive(view)
  }

  const handleSetSideBarChatListDisplay = () => {
    dispatch(setSideBarChatDisplay(false))
  }

  return (
    <section className="bg-mx-primary-9 absolute z-[40] top-0 left-0 w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full flex flex-col items-start justify-start mt-5 px-7 pb-32">
        <div className="w-full flex flex-row items-center justify-between">
          <img
            src="/svg/mxchat-new-logo.svg"
            alt="MX Logo"
            className="w-[100px] h-auto"
          />

          <button
            type="button"
            className="relative w-[40px] h-[40px] bg-[#425b8376] flex items-center justify-center rounded-lg"
            onClick={handleSetSideBarChatListDisplay}
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        <div className="w-full mt-1 flex flex-row items-center justify-start gap-3.5 px-3">
          <div className="relative flex max-w-xs items-center rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              width={0}
              src={user.profileImage}
              alt={user.fullname + ' Profile Image'}
              className="h-16 w-16 rounded-full"
            />
          </div>

          <div className="flex flex-col items-start justify-between gap-0.5">
            <p className="text-xl font-medium text-mx-black capitalize">
              {user.fullname}
            </p>
            <p className="text-base font-normal text-mx-grey-2">{user.email}</p>
          </div>
        </div>

        <div className="relative w-full mt-2">
          <div className="w-full flex flex-row items-center justify-center gap-5">
            {inViewtabs.map((view, index) => (
              <div key={index} className={'w-1/2'}>
                <button
                  type="button"
                  onClick={() => handleOnInViewBtnClick(view.name)}
                  className={clsx([
                    'w-full flex flex-col items-center justify-center py-5 rounded-lg',
                    {
                      'bg-mx-primary-5': view.name === inViewTabActive,
                    },
                  ])}
                >
                  <img
                    src={view.icon.inactive}
                    alt={view.name}
                    className={clsx([
                      '',
                      {
                        invert: view.name === inViewTabActive,
                      },
                    ])}
                  />
                  <p
                    className={clsx([
                      'text-xs pt-2 capitalize',
                      {
                        'text-white': view.name === inViewTabActive,
                      },
                    ])}
                  >
                    {view.name}
                  </p>
                </button>
              </div>
            ))}
          </div>

          {/* Seperator */}
          <div className="w-[70%] mx-auto h-[1px] bg-mx-grey opacity-60 mt-2.5 mb-6"></div>
        </div>

        {/*  */}
        <div className="w-full h-full">{InViewObjectMap[inViewTabActive]}</div>

        {/* Settings and Logout Button container */}
        <div className="absolute bottom-2 left-0 w-full px-7 pb-5">
          <button
            type="button"
            disabled
            className="w-full bg-mx-primary-5 text-white py-2 rounded-lg mb-2 opacity-70"
          >
            Settings
          </button>
          <button
            type="button"
            onClick={() => console.log('Log out')}
            className="w-full bg-red-600 text-white py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  )
}

const ChatsView = () => {
  return (
    <div className="h-full">
      <ComingSoon text="Chats coming soon" />
    </div>
  )
}

const GroupsView = () => {
  return (
    <div className="h-full">
      <ComingSoon text="Groups coming soon" />
    </div>
  )
}

export default SideBarChatList
