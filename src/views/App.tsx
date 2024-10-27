import React, { Fragment } from 'react'
import { TRoute } from '../../typings'
import { useAppSelector } from '../app'
import { ChatInView, GroupsInView, SettingsInView } from './InView'

const ApplicationView = () => {
  const activeInView = useAppSelector(
    (state) => state.internalRouteReduce.active,
  )
  const { user } = useAppSelector((state) => state.userReduce)

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
