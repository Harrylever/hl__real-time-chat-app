import React, { Fragment } from 'react'
import { TRoute } from '../../typings'
import { useAppSelector } from '../app'
import MobileChatView from './MobileViews/Chat'
import DesktopChatView from './DesktopViews/Chat'
import MobileGroupsView from './MobileViews/Groups'
import MobileContacts from './MobileViews/Contacts'
import DesktopGroupsView from './DesktopViews/Groups'
import useHeaderHeight from 'src/hooks/useHeaderHeight'
import MobileSettingsView from './MobileViews/Settings'
import DesktopSettingsView from './DesktopViews/Settings'
import ChangeViewComponent from 'src/components/ui/ChangeViewComponent'
import useGetScreenOrientation from 'src/hooks/useGetScreenOrientation'
import AppMobileNavigation from 'src/components/ui/AppMobileNavigation'
import MobileCurrentChatViewWrapper from 'src/components/ui/MobileCurrentChatView/MobileCurrentChatViewWrapper'
import { AnimatePresence } from 'framer-motion'

const ApplicationView = () => {
  const headerHeight = useHeaderHeight()
  const activeInView = useAppSelector(
    (state) => state.internalRouteReduce.active,
  )
  const { screenOrientation } = useGetScreenOrientation()
  const currentChat = useAppSelector((state) => state.chatReduce.chat)

  const desktopviews: Record<TRoute, React.ReactNode> = {
    chats: <DesktopChatView />,
    groups: <DesktopGroupsView />,
    settings: <DesktopSettingsView />,
    contacts: <DesktopGroupsView />,
  }

  const mobileviews: Record<TRoute, React.ReactNode> = {
    chats: <MobileChatView />,
    groups: <MobileGroupsView />,
    contacts: <MobileContacts />,
    settings: <MobileSettingsView />,
  }

  const isDesktop = screenOrientation === 'desktop'

  return (
    <main
      style={{ height: isDesktop ? `calc(100vh - ${headerHeight}px)` : '100%' }}
      className={`flex w-full ${isDesktop ? 'flex-row' : 'flex-col'}`}
    >
      {isDesktop ? (
        <Fragment>
          <ChangeViewComponent activeRoute={activeInView} />
          <div className="h-full w-full pr-3">{desktopviews[activeInView]}</div>
        </Fragment>
      ) : (
        <AnimatePresence>
          {currentChat ? (
            <MobileCurrentChatViewWrapper currentChat={currentChat} />
          ) : (
            <Fragment>
              <div className="h-[88vh] w-full">{mobileviews[activeInView]}</div>
              <AppMobileNavigation activeRoute={activeInView} />
            </Fragment>
          )}
        </AnimatePresence>
      )}
    </main>
  )
}

export default ApplicationView
