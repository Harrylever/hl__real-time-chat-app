import React, { Fragment } from 'react'
import { TRoute } from '../../typings'
import { useAppSelector } from '../app'
import { ChatInView, GroupsInView, SettingsInView } from './InView'

const ApplicationView = () => {
  const activeInView = useAppSelector(
    (state) => state.internalRouteReduce.active,
  )

  const views: Record<TRoute, React.ReactNode> = {
    chats: <ChatInView />,
    groups: <GroupsInView />,
    settings: <SettingsInView />,
  }

  return <Fragment>{views[activeInView]}</Fragment>
}

export default ApplicationView
