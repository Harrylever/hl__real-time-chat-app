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

const ApplicationView = () => {
  const headerHeight = useHeaderHeight()
  const activeInView = useAppSelector(
    (state) => state.internalRouteReduce.active,
  )
  const { screenOrientation } = useGetScreenOrientation()

  const desktopviews: Record<TRoute, React.ReactNode> = {
    chats: <DesktopChatView />,
    groups: <DesktopGroupsView />,
    settings: <DesktopSettingsView />,
    contacts: null,
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
      className={
        isDesktop
          ? 'flex flex-row w-full'
          : 'flex flex-col w-full border border-black'
      }
    >
      {screenOrientation === 'desktop' ? (
        <Fragment>
          <ChangeViewComponent activeRoute={activeInView} />
          <div className="h-full w-full pr-3">{desktopviews[activeInView]}</div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="h-full w-full">{mobileviews[activeInView]}</div>
          <AppMobileNavigation activeRoute={activeInView} />
        </Fragment>
      )}
    </main>
  )
}

export default ApplicationView
