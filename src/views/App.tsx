import React from 'react'
import ChatView from './InView/Chat'
import { TRoute } from '../../typings'
import { useAppSelector } from '../app'
import GroupsView from './InView/Groups'
import SettingsView from './InView/Settings'
import useHeaderHeight from 'src/hooks/useHeaderHeight'
import ChangeViewComponent from 'src/components/ui/ChangeViewComponent'

const ApplicationView = () => {
  const headerHeight = useHeaderHeight()

  const activeInView = useAppSelector(
    (state) => state.internalRouteReduce.active,
  )

  const views: Record<TRoute, React.ReactNode> = {
    chats: <ChatView />,
    groups: <GroupsView />,
    settings: <SettingsView />,
  }

  return (
    <main
      style={{ height: `calc(100vh - ${headerHeight}px)` }}
      className="flex flex-row w-full"
    >
      <ChangeViewComponent />
      <div className="h-full w-full">{views[activeInView]}</div>
    </main>
  )
}

export default ApplicationView
