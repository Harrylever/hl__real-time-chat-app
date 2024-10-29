import React, { Fragment } from 'react'
import { useAppSelector } from '../app'
import { RouteProps, TRoute } from '../../typings'
import { ChatInView, GroupsInView, SettingsInView } from './InView'

interface ApplicationViewProps extends RouteProps {}

const ApplicationView: React.FC<ApplicationViewProps> = ({ user }) => {
  const activeInView = useAppSelector(
    (state) => state.internalRouteReduce.active,
  )

  if (!user) {
    return (
      <div>
        <p>User not found</p>
      </div>
    )
  }

  const views: Record<TRoute, React.ReactNode> = {
    chats: <ChatInView user={user} />,
    groups: <GroupsInView />,
    settings: <SettingsInView />,
  }

  return <Fragment>{views[activeInView]}</Fragment>
}

export default ApplicationView
